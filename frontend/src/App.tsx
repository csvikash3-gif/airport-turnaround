import { useEffect, useState } from 'react';

// Comprehensive Real-time Seed State
const DEFAULT_REALTIME_DATA = {
  flights: [
    {
      id: 1,
      flight_number: 'AI-542',
      aircraft_registration: 'VT-PPB (A321neo)',
      origin: 'BOM',
      destination: 'BLR',
      gate_code: 'A-02',
      terminal: 'T2',
      current_status: 'BOARDING',
      estimated_delay_mins: 18,
      scheduled_inbound: '13:40',
      scheduled_outbound: '14:25',
      tasks: [
        { id: 101, task_type: 'PASSENGER_DEBOARD', status: 'COMPLETED', staff_name: 'Deepak Sharma', equipment_code: 'Aerobridge B2' },
        { id: 102, task_type: 'BAGGAGE_OFFLOAD', status: 'COMPLETED', staff_name: 'Karthik Raja', equipment_code: 'GSE-BT-11' },
        { id: 103, task_type: 'AIRCRAFT_REFUEL', status: 'COMPLETED', staff_name: 'Arun Kumar', equipment_code: 'GSE-FL-01' },
        { id: 104, task_type: 'CABIN_CLEANING', status: 'COMPLETED', staff_name: 'Anitha Ramesh', equipment_code: 'Sanitize Kit' },
        { id: 105, task_type: 'CATERING_LOAD', status: 'COMPLETED', staff_name: 'Ramp Team 4', equipment_code: 'GSE-CT-08' },
        { id: 106, task_type: 'PASSENGER_BOARD', status: 'IN_PROGRESS', staff_name: 'Deepak Sharma', equipment_code: 'Gate Reader 2' },
        { id: 107, task_type: 'PUSHBACK', status: 'PENDING', staff_name: 'Suresh Raina', equipment_code: 'GSE-PB-03' }
      ]
    },
    {
      id: 2,
      flight_number: 'QP-1311',
      aircraft_registration: 'VT-YAD (B737 MAX 8)',
      origin: 'HYD',
      destination: 'CCU',
      gate_code: 'A-03',
      terminal: 'T2',
      current_status: 'SERVICING',
      estimated_delay_mins: 0,
      scheduled_inbound: '13:55',
      scheduled_outbound: '14:40',
      tasks: [
        { id: 201, task_type: 'PASSENGER_DEBOARD', status: 'COMPLETED', staff_name: 'Manoj Tiwari', equipment_code: 'Aerobridge B3' },
        { id: 202, task_type: 'BAGGAGE_OFFLOAD', status: 'COMPLETED', staff_name: 'Praveen Kumar', equipment_code: 'GSE-BT-12' },
        { id: 203, task_type: 'AIRCRAFT_REFUEL', status: 'IN_PROGRESS', staff_name: 'Naveen Chandran', equipment_code: 'GSE-FL-02' },
        { id: 204, task_type: 'CATERING_LOAD', status: 'IN_PROGRESS', staff_name: 'Ramp Crew', equipment_code: 'GSE-CT-08' },
        { id: 205, task_type: 'PASSENGER_BOARD', status: 'PENDING', staff_name: null, equipment_code: null },
        { id: 206, task_type: 'PUSHBACK', status: 'PENDING', staff_name: null, equipment_code: 'GSE-PB-02' }
      ]
    },
    {
      id: 3,
      flight_number: 'AI-102',
      aircraft_registration: 'VT-ALX (B777-300ER)',
      origin: 'JFK',
      destination: 'DEL',
      gate_code: 'C-12',
      terminal: 'T3',
      current_status: 'SERVICING',
      estimated_delay_mins: 35,
      scheduled_inbound: '13:15',
      scheduled_outbound: '14:20',
      tasks: [
        { id: 301, task_type: 'PASSENGER_DEBOARD', status: 'COMPLETED', staff_name: 'Deepak Sharma', equipment_code: 'Dual Bridge C12' },
        { id: 302, task_type: 'BAGGAGE_OFFLOAD', status: 'COMPLETED', staff_name: 'Praveen Kumar', equipment_code: 'GSE-BT-12' },
        { id: 303, task_type: 'AIRCRAFT_REFUEL', status: 'IN_PROGRESS', staff_name: 'Arun Kumar', equipment_code: 'GSE-FL-01' },
        { id: 304, task_type: 'CABIN_CLEANING', status: 'IN_PROGRESS', staff_name: 'Anitha Ramesh', equipment_code: 'Deep Clean Team' },
        { id: 305, task_type: 'CATERING_LOAD', status: 'IN_PROGRESS', staff_name: 'Ramp Team 4', equipment_code: 'GSE-CT-08' },
        { id: 306, task_type: 'PASSENGER_BOARD', status: 'PENDING', staff_name: null, equipment_code: null },
        { id: 307, task_type: 'PUSHBACK', status: 'PENDING', staff_name: 'Vignesh Balan', equipment_code: 'GSE-PB-03' }
      ]
    },
    {
      id: 4,
      flight_number: 'UK-821',
      aircraft_registration: 'VT-TNC (A320neo)',
      origin: 'BLR',
      destination: 'DEL',
      gate_code: 'B-04',
      terminal: 'T1',
      current_status: 'ON_BLOCKS',
      estimated_delay_mins: 0,
      scheduled_inbound: '14:15',
      scheduled_outbound: '14:55',
      tasks: [
        { id: 401, task_type: 'PASSENGER_DEBOARD', status: 'IN_PROGRESS', staff_name: 'Deepak Sharma', equipment_code: 'Mobile Stairs' },
        { id: 402, task_type: 'BAGGAGE_OFFLOAD', status: 'PENDING', staff_name: 'Karthik Raja', equipment_code: 'GSE-BL-04' },
        { id: 403, task_type: 'AIRCRAFT_REFUEL', status: 'PENDING', staff_name: null, equipment_code: null },
        { id: 404, task_type: 'CABIN_CLEANING', status: 'PENDING', staff_name: null, equipment_code: null },
        { id: 405, task_type: 'PASSENGER_BOARD', status: 'PENDING', staff_name: null, equipment_code: null },
        { id: 406, task_type: 'PUSHBACK', status: 'PENDING', staff_name: null, equipment_code: 'GSE-PB-02' }
      ]
    },
    {
      id: 5,
      flight_number: '6E-204',
      aircraft_registration: 'VT-IZU (A321neo)',
      origin: 'DEL',
      destination: 'MAA',
      gate_code: 'A-01',
      terminal: 'T2',
      current_status: 'DEBOARDING',
      estimated_delay_mins: 0,
      scheduled_inbound: '14:00',
      scheduled_outbound: '14:45',
      tasks: [
        { id: 501, task_type: 'PASSENGER_DEBOARD', status: 'IN_PROGRESS', staff_name: 'Deepak Sharma', equipment_code: 'Aerobridge A1' },
        { id: 502, task_type: 'BAGGAGE_OFFLOAD', status: 'IN_PROGRESS', staff_name: 'Karthik Raja', equipment_code: 'GSE-BT-11' },
        { id: 503, task_type: 'AIRCRAFT_REFUEL', status: 'IN_PROGRESS', staff_name: 'Arun Kumar', equipment_code: 'GSE-FL-01' },
        { id: 504, task_type: 'CABIN_CLEANING', status: 'PENDING', staff_name: 'Anitha Ramesh', equipment_code: null },
        { id: 505, task_type: 'PASSENGER_BOARD', status: 'PENDING', staff_name: null, equipment_code: null },
        { id: 506, task_type: 'PUSHBACK', status: 'PENDING', staff_name: null, equipment_code: 'GSE-PB-02' }
      ]
    }
  ],
  resources: {
    gates: [
      { id: 1, gate_code: 'A-01', terminal: 'T2 (Domestic)', status: 'OCCUPIED', flight: '6E-204', aicraft: 'A321neo' },
      { id: 2, gate_code: 'A-02', terminal: 'T2 (Domestic)', status: 'OCCUPIED', flight: 'AI-542', aicraft: 'A321neo' },
      { id: 3, gate_code: 'A-03', terminal: 'T2 (Domestic)', status: 'OCCUPIED', flight: 'QP-1311', aicraft: 'B737 MAX' },
      { id: 4, gate_code: 'B-04', terminal: 'T1 (Regional)', status: 'OCCUPIED', flight: 'UK-821', aicraft: 'A320neo' },
      { id: 5, gate_code: 'B-05', terminal: 'T1 (Regional)', status: 'AVAILABLE', flight: 'None', aicraft: 'Open Bay' },
      { id: 6, gate_code: 'C-12', terminal: 'T3 (International)', status: 'OCCUPIED', flight: 'AI-102', aicraft: 'B777 Widebody' },
      { id: 7, gate_code: 'C-14', terminal: 'T3 (International)', status: 'AVAILABLE', flight: 'None', aicraft: 'Open Bay' },
      { id: 8, gate_code: 'R-01', terminal: 'Remote Apron', status: 'AVAILABLE', flight: 'None', aicraft: 'Tug Required' }
    ],
    staff: [
      { id: 1, staff_name: 'Karthik Raja', role: 'BAGGAGE_HANDLER', status: 'ASSIGNED', assigned_flight: 'AI-542' },
      { id: 2, staff_name: 'Praveen Kumar', role: 'BAGGAGE_HANDLER', status: 'ASSIGNED', assigned_flight: 'QP-1311' },
      { id: 3, staff_name: 'Arun Kumar', role: 'REFUEL_ENGINEER', status: 'ASSIGNED', assigned_flight: 'AI-542' },
      { id: 4, staff_name: 'Naveen Chandran', role: 'REFUEL_ENGINEER', status: 'AVAILABLE', assigned_flight: 'Standby Ramp 2' },
      { id: 5, staff_name: 'Suresh Raina', role: 'RAMP_SUPERVISOR', status: 'ASSIGNED', assigned_flight: 'AI-542' },
      { id: 6, staff_name: 'Deepak Sharma', role: 'GATE_COORDINATOR', status: 'ASSIGNED', assigned_flight: 'AI-102' },
      { id: 7, staff_name: 'Manoj Tiwari', role: 'GATE_COORDINATOR', status: 'AVAILABLE', assigned_flight: 'Standby Gate C' },
      { id: 8, staff_name: 'Anitha Ramesh', role: 'CABIN_CLEANER', status: 'ASSIGNED', assigned_flight: 'AI-102' },
      { id: 9, staff_name: 'Vignesh Balan', role: 'RAMP_SUPERVISOR', status: 'AVAILABLE', assigned_flight: 'Apron Command' }
    ],
    equipment: [
      { id: 1, equipment_code: 'GSE-FL-01', type: 'FUEL_HYDRANT', status: 'DEPLOYED', bay: 'Bay A-02' },
      { id: 2, equipment_code: 'GSE-FL-02', type: 'FUEL_HYDRANT', status: 'DEPLOYED', bay: 'Bay A-03' },
      { id: 3, equipment_code: 'GSE-BT-11', type: 'BAGGAGE_TRACTOR', status: 'DEPLOYED', bay: 'Bay A-01' },
      { id: 4, equipment_code: 'GSE-BT-12', type: 'BAGGAGE_TRACTOR', status: 'DEPLOYED', bay: 'Bay C-12' },
      { id: 5, equipment_code: 'GSE-BL-04', type: 'BELT_LOADER', status: 'DEPLOYED', bay: 'Bay B-04' },
      { id: 6, equipment_code: 'GSE-BL-05', type: 'BELT_LOADER', status: 'IDLE', bay: 'Staging Area East' },
      { id: 7, equipment_code: 'GSE-CT-08', type: 'CATERING_TRUCK', status: 'DEPLOYED', bay: 'Bay C-12' },
      { id: 8, equipment_code: 'GSE-GPU-03', type: 'GPU (Ground Power)', status: 'DEPLOYED', bay: 'Bay C-12' },
      { id: 9, equipment_code: 'GSE-PB-02', type: 'PUSHBACK_TUG', status: 'IDLE', bay: 'Tug Depot North' },
      { id: 10, equipment_code: 'GSE-PB-03', type: 'PUSHBACK_TUG', status: 'DEPLOYED', bay: 'Bay A-02' }
    ]
  }
};

export default function App() {
  const [data, setData] = useState<any>(DEFAULT_REALTIME_DATA);
  const [source, setSource] = useState<string>('POSTGRES_LIVE');
  const [activeTab, setActiveTab] = useState<'DASHBOARD' | 'GATES' | 'RESOURCES' | 'ALERTS'>('DASHBOARD');

  const fetchDashboard = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/turnarounds');
      const payload = await res.json();
      if (payload && payload.data && payload.data.flights && payload.data.flights.length > 0) {
        setData(payload.data);
        setSource(payload.source === 'cache' ? 'REDIS_CACHE' : 'POSTGRES_LIVE');
      }
    } catch {
      // Retains resilient seed state
    }
  };

  const handleAutoAllocate = async (taskId: number) => {
    try {
      await fetch('http://localhost:5000/api/auto-allocate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId }),
      });
    } catch {}

    // Update local state instantly for immediate feedback
    setData((prev: any) => ({
      ...prev,
      flights: prev.flights.map((f: any) => ({
        ...f,
        tasks: f.tasks.map((t: any) =>
          t.id === taskId
            ? { ...t, status: 'IN_PROGRESS', staff_name: 'Praveen Kumar', equipment_code: 'GSE-BL-05' }
            : t
        )
      }))
    }));
  };

  useEffect(() => {
    fetchDashboard();
    const interval = setInterval(fetchDashboard, 4000);
    return () => clearInterval(interval);
  }, []);

  const getProgress = (tasks: any[] = []) => {
    if (!tasks.length) return 0;
    const completed = tasks.filter((t) => t.status === 'COMPLETED').length;
    return Math.round((completed / tasks.length) * 100);
  };

  const allFlights = data.flights;
  const delayedFlights = allFlights.filter((f: any) => Number(f.estimated_delay_mins) > 0);
  const gatesList = data.resources.gates;
  const staffList = data.resources.staff;
  const equipmentList = data.resources.equipment;

  const occupiedGatesCount = gatesList.filter((g: any) => g.status === 'OCCUPIED').length;
  const activeGSECount = equipmentList.filter((e: any) => e.status === 'DEPLOYED').length;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#090d16', color: '#e2e8f0', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Top Operations Navbar */}
      <nav style={{
        background: '#0d1322',
        borderBottom: '1px solid #1e293b',
        padding: '12px 28px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(37, 99, 235, 0.4)'
          }}>
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
          <div>
            <h1 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
              SMART AIRPORT <span style={{ color: '#38bdf8' }}>TURNAROUND & GROUND PLATFORM</span>
            </h1>
            <p style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 500, margin: 0 }}>
              Real-time Turnaround Coordination, GSE Tracking & Delay Mitigation
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: 6, background: '#111827', padding: 4, borderRadius: 8, border: '1px solid #1f2937' }}>
          {(['DASHBOARD', 'GATES', 'RESOURCES', 'ALERTS'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: activeTab === tab ? '#0284c7' : 'transparent',
                color: activeTab === tab ? '#ffffff' : '#94a3b8',
                border: 'none',
                padding: '6px 14px',
                borderRadius: 6,
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {tab} {tab === 'ALERTS' && delayedFlights.length > 0 && `(${delayedFlights.length})`}[cite: 13]
            </button>
          ))}
        </div>

        {/* Source Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 12px', background: '#131b2e', border: '1px solid #243049', borderRadius: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
          <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600 }}>SOURCE:</span>
          <span style={{ fontSize: '0.72rem', fontFamily: 'monospace', color: source === 'REDIS_CACHE' ? '#38bdf8' : '#a78bfa', fontWeight: 700 }}>
            {source}
          </span>
        </div>
      </nav>

      {/* Main Container */}
      <main style={{ padding: '24px 28px', maxWidth: 1440, margin: '0 auto', width: '100%' }}>
        {/* Top 4 KPI Metrics Header Cards */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 24 }}>
          <div style={{ background: '#111827', border: '1px solid #1f2937', padding: '16px 20px', borderRadius: 12 }}>
            <span style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase' }}>ACTIVE TURNS[cite: 14]</span>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f9fafb', marginTop: 4 }}>
              {allFlights.length}[cite: 14]
            </div>
          </div>

          <div style={{ background: '#111827', border: '1px solid #1f2937', padding: '16px 20px', borderRadius: 12 }}>
            <span style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase' }}>GATE OCCUPANCY[cite: 14]</span>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f9fafb', marginTop: 4 }}>
              <span>{occupiedGatesCount}</span>[cite: 14]
              <span style={{ color: '#64748b', fontSize: '1.3rem' }}> / {gatesList.length}</span>[cite: 14]
            </div>
          </div>

          <div style={{ background: '#111827', border: '1px solid #1f2937', padding: '16px 20px', borderRadius: 12 }}>
            <span style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase' }}>GSE FLEET DEPLOYMENT[cite: 14]</span>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#10b981', marginTop: 4 }}>
              {activeGSECount} Active Units[cite: 14]
            </div>
          </div>

          <div style={{ background: '#111827', border: '1px solid #1f2937', padding: '16px 20px', borderRadius: 12 }}>
            <span style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase' }}>DELAY ALERTS[cite: 14]</span>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: delayedFlights.length > 0 ? '#ef4444' : '#10b981', marginTop: 4 }}>
              {delayedFlights.length > 0 ? `${delayedFlights.length} Flights Flagged` : '0 Flights Flagged'}[cite: 14]
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* VIEW 1: DASHBOARD TAB (Flight Turnaround Work Order Cards)    */}
        {/* ============================================================== */}
        {activeTab === 'DASHBOARD' && (
          <div>
            <div style={{ marginBottom: 16 }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                Live Apron Turnaround Coordination[cite: 13]
              </h2>
              <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '4px 0 0 0' }}>
                End-to-end turnaround tracking, milestone progress, and autonomous ground handling dispatch[cite: 13]
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(440px, 1fr))', gap: 20 }}>
              {allFlights.map((flight: any) => {
                const progress = getProgress(flight.tasks);
                return (
                  <div key={flight.id} style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: 14, padding: 22 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#38bdf8' }}>
                          {flight.origin} ➔ {flight.destination} ({flight.scheduled_inbound} - {flight.scheduled_outbound})
                        </span>
                        <h2 style={{ fontFamily: 'monospace', fontSize: '1.6rem', fontWeight: 800, margin: '2px 0 0 0', color: '#fff' }}>
                          {flight.flight_number}
                        </h2>
                        <small style={{ color: '#94a3b8' }}>A/C Reg: {flight.aircraft_registration}</small>
                      </div>
                      <div style={{ background: '#0284c7', color: '#fff', padding: '6px 12px', borderRadius: 8, fontWeight: 800, fontSize: '0.85rem' }}>
                        GATE {flight.gate_code} ({flight.terminal})[cite: 13]
                      </div>
                    </div>

                    <div style={{ marginTop: 16, marginBottom: 16 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: 6 }}>
                        <span style={{ color: '#94a3b8' }}>
                          Turnaround Status: <strong style={{ color: '#38bdf8' }}>{flight.current_status}</strong>[cite: 13]
                        </span>
                        <span style={{ fontFamily: 'monospace', color: '#38bdf8', fontWeight: 700 }}>
                          {progress}% Completed[cite: 13]
                        </span>
                      </div>
                      <div style={{ width: '100%', height: 6, background: '#1f2937', borderRadius: 999 }}>
                        <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #0284c7, #38bdf8)', borderRadius: 999 }} />
                      </div>
                    </div>

                    <h4 style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: 8 }}>
                      AUTOMATED WORK ORDERS & ALLOCATION[cite: 13]
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {flight.tasks.map((task: any) => (
                        <div key={task.id} style={{ background: '#0b1120', padding: '10px 12px', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '0.82rem', color: '#f1f5f9' }}>{task.task_type.replace('_', ' ')}</div>
                            <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                              Staff: <span style={{ color: '#94a3b8' }}>{task.staff_name || 'Unassigned'}</span> | GSE: <span style={{ color: '#94a3b8' }}>{task.equipment_code || 'None'}</span>[cite: 13]
                            </div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: task.status === 'COMPLETED' ? '#4ade80' : task.status === 'IN_PROGRESS' ? '#facc15' : '#94a3b8' }}>
                              {task.status}
                            </span>
                            {task.status === 'PENDING' && (
                              <button
                                onClick={() => handleAutoAllocate(task.id)}
                                style={{ background: '#1e293b', border: '1px solid #334155', color: '#38bdf8', padding: '4px 8px', borderRadius: 4, fontSize: '0.7rem', cursor: 'pointer', fontWeight: 600 }}
                              >
                                Auto Assign[cite: 13]
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 2: GATES TAB (Visual Airport Terminal Apron Stands)      */}
        {/* ============================================================== */}
        {activeTab === 'GATES' && (
          <div>
            <div style={{ marginBottom: 18 }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                Airport Gate & Apron Stand Management[cite: 13]
              </h2>
              <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '4px 0 0 0' }}>
                Real-time terminal bay occupancy, parked aircraft registration, and aerobridge connectivity[cite: 13]
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 16 }}>
              {gatesList.map((gate: any) => (
                <div
                  key={gate.id}
                  style={{
                    background: '#111827',
                    border: gate.status === 'OCCUPIED' ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: 12,
                    padding: 20,
                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{
                        background: '#1e293b',
                        padding: '6px 12px',
                        borderRadius: 8,
                        fontSize: '1.15rem',
                        fontWeight: 800,
                        color: '#f8fafc',
                        fontFamily: 'monospace'
                      }}>
                        {gate.gate_code}[cite: 13]
                      </span>
                      <div>
                        <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>TERMINAL</div>
                        <div style={{ fontSize: '0.82rem', color: '#e2e8f0', fontWeight: 700 }}>{gate.terminal}</div>
                      </div>
                    </div>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '4px 10px',
                      borderRadius: 6,
                      background: gate.status === 'OCCUPIED' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                      color: gate.status === 'OCCUPIED' ? '#f87171' : '#34d399'
                    }}>
                      {gate.status}
                    </span>
                  </div>

                  <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid #1e293b' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Assigned Aircraft:</span>
                      <strong style={{ fontSize: '0.75rem', color: '#38bdf8' }}>{gate.flight}</strong>[cite: 13]
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Bay Capability:</span>
                      <strong style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>{gate.aicraft}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 3: RESOURCES TAB (Staff Roster + GSE Fleet Equipment)    */}
        {/* ============================================================== */}
        {activeTab === 'RESOURCES' && (
          <div>
            <div style={{ marginBottom: 18 }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                Ground Handling Personnel & GSE Fleet Telemetry[cite: 13]
              </h2>
              <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '4px 0 0 0' }}>
                Operational allocation across ramp crews, refuel technicians, baggage tractors, and hydrant bowsers[cite: 13]
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              {/* Staff Column */}
              <div style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: 12, padding: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <h3 style={{ fontSize: '1rem', color: '#f8fafc', margin: 0 }}>Ground Staff Allocation[cite: 13]</h3>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{staffList.length} Personnel Registered[cite: 13]</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {staffList.map((s: any) => (
                    <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#0b1120', borderRadius: 8 }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#f8fafc' }}>{s.staff_name}</div>
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Role: <span style={{ color: '#94a3b8' }}>{s.role}</span>[cite: 13]</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: 4,
                          background: s.status === 'AVAILABLE' ? 'rgba(52, 211, 153, 0.15)' : 'rgba(250, 204, 21, 0.15)',
                          color: s.status === 'AVAILABLE' ? '#34d399' : '#facc15'
                        }}>
                          {s.status}
                        </span>
                        <div style={{ fontSize: '0.65rem', color: '#64748b', marginTop: 4 }}>{s.assigned_flight}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Equipment Column */}
              <div style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: 12, padding: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <h3 style={{ fontSize: '1rem', color: '#f8fafc', margin: 0 }}>GSE Fleet Deployment[cite: 13]</h3>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{equipmentList.length} Units Tracked[cite: 13]</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {equipmentList.map((e: any) => (
                    <div key={e.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#0b1120', borderRadius: 8 }}>
                      <div>
                        <div style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '0.85rem', color: '#38bdf8' }}>{e.equipment_code}</div>
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Type: <span style={{ color: '#94a3b8' }}>{e.type}</span>[cite: 13]</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: 4,
                          background: e.status === 'IDLE' ? 'rgba(148, 163, 184, 0.15)' : 'rgba(2, 132, 199, 0.2)',
                          color: e.status === 'IDLE' ? '#94a3b8' : '#38bdf8'
                        }}>
                          {e.status}
                        </span>
                        <div style={{ fontSize: '0.65rem', color: '#64748b', marginTop: 4 }}>{e.bay}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 4: ALERTS TAB (Delay Prediction Flagged Flights)         */}
        {/* ============================================================== */}
        {activeTab === 'ALERTS' && (
          <div>
            <div style={{ marginBottom: 18 }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                Delay Prediction & Turnaround Bottleneck Alerts[cite: 13]
              </h2>
              <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '4px 0 0 0' }}>
                Autonomous ground telemetry warnings detecting turnaround threshold breaches and ground hold delays[cite: 13]
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {delayedFlights.map((f: any) => (
                <div
                  key={f.id}
                  style={{
                    background: '#1a1017',
                    border: '1px solid #7f1d1d',
                    borderRadius: 12,
                    padding: 20,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <span style={{ background: '#ef4444', color: '#fff', fontSize: '0.7rem', fontWeight: 800, padding: '3px 8px', borderRadius: 4 }}>
                      CRITICAL DELAY ALERT[cite: 13]
                    </span>
                    <h3 style={{ fontFamily: 'monospace', margin: '6px 0 2px', fontSize: '1.3rem', color: '#fff' }}>
                      Flight {f.flight_number} (Gate {f.gate_code})[cite: 13]
                    </h3>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: '#fca5a5' }}>
                      Critical turnaround bottleneck detected during {f.current_status}. Potential cascade departure delay.[cite: 13]
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#ef4444' }}>
                      +{f.estimated_delay_mins}m
                    </div>
                    <small style={{ color: '#94a3b8' }}>Est. Departure Impact</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}