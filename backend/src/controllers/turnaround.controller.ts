import { Request, Response } from 'express';
import { pool } from '../config/db';
import { redisClient } from '../config/redis';

const CACHE_KEY = 'airport:telemetry_cache';

export const getTurnaroundDashboardData = async (_req: Request, res: Response): Promise<void> => {
  try {
    if (redisClient.isOpen) {
      const cached = await redisClient.get(CACHE_KEY);
      if (cached) {
        res.json({ source: 'cache', data: JSON.parse(cached) });
        return;
      }
    }

    const flightsQuery = `
      SELECT 
        f.id,
        f.flight_number,
        f.aircraft_registration,
        f.origin,
        f.destination,
        f.current_status,
        COALESCE(f.estimated_delay_mins, 0) AS estimated_delay_mins,
        f.scheduled_inbound,
        f.scheduled_outbound,
        COALESCE(g.gate_code, 'TBD') AS gate_code,
        COALESCE(g.terminal, 'T2') AS terminal,
        COALESCE(
          json_agg(
            json_build_object(
              'id', t.id,
              'task_type', t.task_type,
              'status', t.status,
              'staff_name', s.staff_name,
              'equipment_code', e.equipment_code
            ) ORDER BY t.id
          ) FILTER (WHERE t.id IS NOT NULL), '[]'
        ) AS tasks
      FROM turnaround_flights f
      LEFT JOIN gates g ON f.gate_id = g.id
      LEFT JOIN turnaround_tasks t ON f.id = t.flight_id
      LEFT JOIN staff s ON t.assigned_staff_id = s.id
      LEFT JOIN equipment e ON t.assigned_equipment_id = e.id
      GROUP BY f.id, g.gate_code, g.terminal
      ORDER BY f.id ASC;
    `;

    const [flightsRes, gatesRes, equipRes, staffRes] = await Promise.all([
      pool.query(flightsQuery),
      pool.query('SELECT * FROM gates ORDER BY gate_code ASC;'),
      pool.query('SELECT * FROM equipment ORDER BY equipment_code ASC;'),
      pool.query('SELECT * FROM staff ORDER BY id ASC;')
    ]);

    const payload = {
      flights: flightsRes.rows,
      resources: {
        gates: gatesRes.rows,
        equipment: equipRes.rows,
        staff: staffRes.rows
      },
      timestamp: new Date().toISOString()
    };

    if (redisClient.isOpen) {
      await redisClient.setEx(CACHE_KEY, 8, JSON.stringify(payload));
    }

    res.json({ source: 'db', data: payload });
  } catch (error) {
    console.error('Database query fallback:', error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const autoAllocateResources = async (req: Request, res: Response): Promise<void> => {
  const { taskId } = req.body;
  try {
    const staffRes = await pool.query("SELECT id FROM staff WHERE status = 'AVAILABLE' LIMIT 1;");
    const equipRes = await pool.query("SELECT id FROM equipment WHERE status = 'IDLE' LIMIT 1;");

    const staffId = staffRes.rows[0]?.id || null;
    const equipId = equipRes.rows[0]?.id || null;

    await pool.query(
      "UPDATE turnaround_tasks SET assigned_staff_id = $1, assigned_equipment_id = $2, status = 'IN_PROGRESS' WHERE id = $3",
      [staffId, equipId, taskId]
    );

    if (staffId) await pool.query("UPDATE staff SET status = 'ASSIGNED' WHERE id = $1", [staffId]);
    if (equipId) await pool.query("UPDATE equipment SET status = 'DEPLOYED' WHERE id = $1", [equipId]);

    if (redisClient.isOpen) await redisClient.del(CACHE_KEY);

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};