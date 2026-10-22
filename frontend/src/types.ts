export interface Task {
  id: number;
  task_type: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  staff_name: string | null;
  equipment_code: string | null;
}

export interface TurnaroundFlight {
  id: number;
  flight_number: string;
  aircraft_registration: string;
  origin?: string;
  destination?: string;
  gate_code: string;
  terminal: string;
  current_status: string;
  estimated_delay_mins: number;
  scheduled_inbound: string;
  scheduled_outbound: string;
  tasks: Task[];
}

export interface Gate {
  id: number;
  gate_code: string;
  terminal: string;
  status: 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE';
}

export interface Equipment {
  id: number;
  equipment_code: string;
  type: string;
  status: 'IDLE' | 'DEPLOYED' | 'MAINTENANCE';
}

export interface Staff {
  id: number;
  staff_name: string;
  role: string;
  status: 'AVAILABLE' | 'ASSIGNED' | 'OFF_DUTY';
}

export interface DashboardPayload {
  flights: TurnaroundFlight[];
  resources: {
    gates: Gate[];
    equipment: Equipment[];
    staff: Staff[];
  };
  timestamp: string;
}