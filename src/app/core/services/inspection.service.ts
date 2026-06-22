import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Inspection } from '../../models/inspection.model';

const MOCK_INSPECTIONS: Inspection[] = [
  { id: 'INS-001', deviceId: 'ANYmal-C-042', deviceName: 'ANYmal Alpha', location: 'Zone A — Turbine Hall',    status: 'ok',       severity: 'low',    temperature: 42.1, timestamp: '2026-06-06T08:14:00Z', duration: 18 },
  { id: 'INS-002', deviceId: 'ANYmal-C-107', deviceName: 'ANYmal Beta',  location: 'Zone B — Compressor Room', status: 'warning',  severity: 'medium', temperature: 78.4, timestamp: '2026-06-06T08:22:00Z', duration: 24 },
  { id: 'INS-003', deviceId: 'ANYmal-C-093', deviceName: 'ANYmal Gamma', location: 'Zone C — Pump Room',       status: 'critical', severity: 'high',   temperature: 112.3, timestamp: '2026-06-06T08:31:00Z', duration: 31 },
  { id: 'INS-004', deviceId: 'ANYmal-C-055', deviceName: 'ANYmal Delta', location: 'Zone A — Turbine Hall',    status: 'ok',       severity: 'low',    temperature: 38.7, timestamp: '2026-06-06T08:45:00Z', duration: 15 },
  { id: 'INS-005', deviceId: 'ANYmal-C-042', deviceName: 'ANYmal Alpha', location: 'Zone D — Control Room',    status: 'warning',  severity: 'medium', temperature: 65.2, timestamp: '2026-06-06T09:00:00Z', duration: 22 },
  { id: 'INS-006', deviceId: 'ANYmal-C-107', deviceName: 'ANYmal Beta',  location: 'Zone B — Compressor Room', status: 'ok',       severity: 'low',    temperature: 41.8, timestamp: '2026-06-06T09:14:00Z', duration: 19 },
  { id: 'INS-007', deviceId: 'ANYmal-C-093', deviceName: 'ANYmal Gamma', location: 'Zone E — Storage Tank',    status: 'pending',  severity: 'low',    temperature: 35.0, timestamp: '2026-06-06T09:28:00Z', duration: 0  },
  { id: 'INS-008', deviceId: 'ANYmal-C-055', deviceName: 'ANYmal Delta', location: 'Zone C — Pump Room',       status: 'critical', severity: 'high',   temperature: 98.6, timestamp: '2026-06-06T09:35:00Z', duration: 27 },
  { id: 'INS-009', deviceId: 'ANYmal-C-042', deviceName: 'ANYmal Alpha', location: 'Zone F — Generator Bay',   status: 'ok',       severity: 'low',    temperature: 44.3, timestamp: '2026-06-06T09:50:00Z', duration: 21 },
  { id: 'INS-010', deviceId: 'ANYmal-C-107', deviceName: 'ANYmal Beta',  location: 'Zone A — Turbine Hall',    status: 'warning',  severity: 'medium', temperature: 71.9, timestamp: '2026-06-06T10:02:00Z', duration: 26 },
  { id: 'INS-011', deviceId: 'ANYmal-C-093', deviceName: 'ANYmal Gamma', location: 'Zone D — Control Room',    status: 'ok',       severity: 'low',    temperature: 39.4, timestamp: '2026-06-06T10:15:00Z', duration: 17 },
  { id: 'INS-012', deviceId: 'ANYmal-C-055', deviceName: 'ANYmal Delta', location: 'Zone B — Compressor Room', status: 'critical', severity: 'high',   temperature: 105.7, timestamp: '2026-06-06T10:28:00Z', duration: 33 },
];

@Injectable({ providedIn: 'root' })
export class InspectionService {
  // Simulates an HTTP GET — returns Observable with artificial delay
  getInspections(): Observable<Inspection[]> {
    return of(MOCK_INSPECTIONS).pipe(delay(600));
  }
}
