export type InspectionStatus = 'ok' | 'warning' | 'critical' | 'pending';
export type InspectionSeverity = 'low' | 'medium' | 'high';

export interface Inspection {
  id: string;
  deviceId: string;
  deviceName: string;
  location: string;
  status: InspectionStatus;
  severity: InspectionSeverity;
  temperature: number;
  timestamp: string;
  duration: number;
}
