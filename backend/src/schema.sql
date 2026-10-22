-- Clean up existing tables to ensure clean reload
DROP TABLE IF EXISTS turnaround_tasks CASCADE;
DROP TABLE IF EXISTS turnaround_flights CASCADE;
DROP TABLE IF EXISTS staff CASCADE;
DROP TABLE IF EXISTS equipment CASCADE;
DROP TABLE IF EXISTS gates CASCADE;

-- 1. Apron Gates & Remote Stands
CREATE TABLE gates (
    id SERIAL PRIMARY KEY,
    gate_code VARCHAR(10) UNIQUE NOT NULL,
    terminal VARCHAR(10) NOT NULL,
    status VARCHAR(20) DEFAULT 'AVAILABLE' -- AVAILABLE, OCCUPIED, MAINTENANCE
);

-- 2. Ground Support Equipment (GSE) Fleet
CREATE TABLE equipment (
    id SERIAL PRIMARY KEY,
    equipment_code VARCHAR(20) UNIQUE NOT NULL,
    type VARCHAR(30) NOT NULL,
    status VARCHAR(20) DEFAULT 'IDLE' -- IDLE, DEPLOYED, MAINTENANCE
);

-- 3. Ground Handling Operations Staff
CREATE TABLE staff (
    id SERIAL PRIMARY KEY,
    staff_name VARCHAR(60) NOT NULL,
    role VARCHAR(30) NOT NULL,
    status VARCHAR(20) DEFAULT 'AVAILABLE' -- AVAILABLE, ASSIGNED, OFF_DUTY
);

-- 4. Active Turnaround Flights
CREATE TABLE turnaround_flights (
    id SERIAL PRIMARY KEY,
    flight_number VARCHAR(10) NOT NULL,
    aircraft_registration VARCHAR(20) NOT NULL,
    origin VARCHAR(30) NOT NULL,
    destination VARCHAR(30) NOT NULL,
    gate_id INT REFERENCES gates(id),
    scheduled_inbound TIMESTAMP NOT NULL,
    scheduled_outbound TIMESTAMP NOT NULL,
    current_status VARCHAR(30) DEFAULT 'ON_BLOCKS',
    estimated_delay_mins INT DEFAULT 0
);

-- 5. Turnaround Tasks & Ground Work Orders
CREATE TABLE turnaround_tasks (
    id SERIAL PRIMARY KEY,
    flight_id INT REFERENCES turnaround_flights(id) ON DELETE CASCADE,
    task_type VARCHAR(30) NOT NULL,
    assigned_staff_id INT REFERENCES staff(id),
    assigned_equipment_id INT REFERENCES equipment(id),
    status VARCHAR(20) DEFAULT 'PENDING', -- PENDING, IN_PROGRESS, COMPLETED
    start_time TIMESTAMP,
    end_time TIMESTAMP
);

-- ============================================================================
-- SEED DATASET (Exact match to 5/8 Gates, 8 Active GSE, 2 Flagged Flights)
-- ============================================================================

-- 8 Total Gates (5 OCCUPIED, 3 AVAILABLE)
INSERT INTO gates (gate_code, terminal, status) VALUES 
('A-01', 'T2', 'OCCUPIED'),
('A-02', 'T2', 'OCCUPIED'),
('A-03', 'T2', 'OCCUPIED'),
('B-04', 'T1', 'OCCUPIED'),
('B-05', 'T1', 'AVAILABLE'),
('C-12', 'T3', 'OCCUPIED'),
('C-14', 'T3', 'AVAILABLE'),
('R-01', 'REMOTE', 'AVAILABLE');

-- Ground Handling Personnel
INSERT INTO staff (staff_name, role, status) VALUES 
('Karthik Raja', 'BAGGAGE_HANDLER', 'ASSIGNED'),
('Praveen Kumar', 'BAGGAGE_HANDLER', 'ASSIGNED'),
('Arun Kumar', 'REFUEL_ENGINEER', 'ASSIGNED'),
('Naveen Chandran', 'REFUEL_ENGINEER', 'AVAILABLE'),
('Suresh Raina', 'RAMP_SUPERVISOR', 'ASSIGNED'),
('Deepak Sharma', 'GATE_COORDINATOR', 'ASSIGNED'),
('Manoj Tiwari', 'GATE_COORDINATOR', 'AVAILABLE'),
('Anitha Ramesh', 'CABIN_CLEANER', 'ASSIGNED'),
('Vignesh Balan', 'RAMP_SUPERVISOR', 'AVAILABLE');

-- GSE Fleet Equipment (8 DEPLOYED, 2 IDLE = 8 Active Units)
INSERT INTO equipment (equipment_code, type, status) VALUES 
('GSE-FL-01', 'FUEL_HYDRANT', 'DEPLOYED'),
('GSE-FL-02', 'FUEL_HYDRANT', 'DEPLOYED'),
('GSE-BT-11', 'BAGGAGE_TRACTOR', 'DEPLOYED'),
('GSE-BT-12', 'BAGGAGE_TRACTOR', 'DEPLOYED'),
('GSE-BL-04', 'BELT_LOADER', 'DEPLOYED'),
('GSE-BL-05', 'BELT_LOADER', 'IDLE'),
('GSE-CT-08', 'CATERING_TRUCK', 'DEPLOYED'),
('GSE-GPU-03', 'GPU', 'DEPLOYED'),
('GSE-PB-02', 'PUSHBACK_TUG', 'IDLE'),
('GSE-PB-03', 'PUSHBACK_TUG', 'DEPLOYED');

-- 5 Turnaround Flights (2 Flagged for Delays: AI-542 and AI-102)
INSERT INTO turnaround_flights (flight_number, aircraft_registration, origin, destination, gate_id, scheduled_inbound, scheduled_outbound, current_status, estimated_delay_mins) VALUES 
('AI-542', 'VT-PPB', 'BOM', 'BLR', 2, NOW() - INTERVAL '40 minutes', NOW() + INTERVAL '5 minutes', 'BOARDING', 18),
('QP-1311', 'VT-YAD', 'HYD', 'CCU', 3, NOW() - INTERVAL '25 minutes', NOW() + INTERVAL '20 minutes', 'SERVICING', 0),
('AI-102', 'VT-ALX', 'JFK', 'DEL', 6, NOW() - INTERVAL '65 minutes', NOW() - INTERVAL '5 minutes', 'SERVICING', 35),
('UK-821', 'VT-TNC', 'BLR', 'DEL', 4, NOW() - INTERVAL '5 minutes', NOW() + INTERVAL '40 minutes', 'ON_BLOCKS', 0),
('6E-204', 'VT-IZU', 'DEL', 'MAA', 1, NOW() - INTERVAL '20 minutes', NOW() + INTERVAL '25 minutes', 'DEBOARDING', 0);

-- Turnaround Milestones & Equipment Allocations
INSERT INTO turnaround_tasks (flight_id, task_type, assigned_staff_id, assigned_equipment_id, status) VALUES 
-- AI-542 Tasks (Gate A-02, 75% Completed)
(1, 'PASSENGER_DEBOARD', 6, NULL, 'COMPLETED'),
(1, 'BAGGAGE_OFFLOAD', 1, 3, 'COMPLETED'),
(1, 'AIRCRAFT_REFUEL', 3, 1, 'COMPLETED'),
(1, 'CABIN_CLEANING', 8, NULL, 'COMPLETED'),
(1, 'CATERING_LOAD', NULL, 7, 'COMPLETED'),
(1, 'PASSENGER_BOARD', 6, NULL, 'IN_PROGRESS'),
(1, 'PUSHBACK', NULL, 9, 'PENDING'),

-- QP-1311 Tasks (Gate A-03, 50% Completed)
(2, 'PASSENGER_DEBOARD', 7, NULL, 'COMPLETED'),
(2, 'BAGGAGE_OFFLOAD', 2, 4, 'COMPLETED'),
(2, 'AIRCRAFT_REFUEL', 4, 2, 'IN_PROGRESS'),
(2, 'CATERING_LOAD', NULL, 7, 'IN_PROGRESS'),
(2, 'PASSENGER_BOARD', NULL, NULL, 'PENDING'),
(2, 'PUSHBACK', NULL, 9, 'PENDING'),

-- AI-102 Tasks (Gate C-12, 33% Completed, +35m Delay)
(3, 'PASSENGER_DEBOARD', 6, NULL, 'COMPLETED'),
(3, 'BAGGAGE_OFFLOAD', 2, 4, 'COMPLETED'),
(3, 'AIRCRAFT_REFUEL', 3, 1, 'IN_PROGRESS'),
(3, 'CABIN_CLEANING', 8, NULL, 'IN_PROGRESS'),
(3, 'CATERING_LOAD', NULL, 7, 'IN_PROGRESS'),
(3, 'PASSENGER_BOARD', NULL, NULL, 'PENDING'),
(3, 'PUSHBACK', 5, 10, 'PENDING'),

-- UK-821 Tasks (Gate B-04, Fresh Arrival)
(4, 'PASSENGER_DEBOARD', 6, NULL, 'IN_PROGRESS'),
(4, 'BAGGAGE_OFFLOAD', 1, 5, 'PENDING'),
(4, 'AIRCRAFT_REFUEL', NULL, NULL, 'PENDING'),
(4, 'CABIN_CLEANING', NULL, NULL, 'PENDING'),
(4, 'PASSENGER_BOARD', NULL, NULL, 'PENDING'),
(4, 'PUSHBACK', NULL, 9, 'PENDING'),

-- 6E-204 Tasks (Gate A-01, Deboarding)
(5, 'PASSENGER_DEBOARD', 6, NULL, 'IN_PROGRESS'),
(5, 'BAGGAGE_OFFLOAD', 1, 3, 'IN_PROGRESS'),
(5, 'AIRCRAFT_REFUEL', 3, 1, 'IN_PROGRESS'),
(5, 'CABIN_CLEANING', 8, NULL, 'PENDING'),
(5, 'PASSENGER_BOARD', NULL, NULL, 'PENDING'),
(5, 'PUSHBACK', NULL, 9, 'PENDING');