import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from './ui/components/button';
import { InputComponent } from './ui/components/input';
import { BadgeComponent } from './ui/components/badge';
import { DeviceCardComponent, type Device } from './ui/components/device-card';
import { InspectionTableComponent } from './features/dashboard/inspection-table/inspection-table.component';
import { email, minLength, required, validate } from './shared/validators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonComponent, InputComponent, BadgeComponent, DeviceCardComponent, InspectionTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class App {
  protected readonly title = signal('interview-prep-dashboard');

  protected readonly isLoading = signal(false);

  protected simulateLoading(): void {
    this.isLoading.set(true);
    setTimeout(() => this.isLoading.set(false), 2000);
  }

  protected readonly emailError = signal('');
  protected readonly passwordError = signal('');

  protected validateEmail(value: string): void {
    this.emailError.set(validate(value, [required, email]) ?? '');
  }

  protected validatePassword(value: string): void {
    this.passwordError.set(validate(value, [required, minLength(8)]) ?? '');
  }

  protected readonly devices = signal<Device[]>([
    { id: 'ANYmal-C-042', name: 'ANYmal Alpha', status: 'inspecting', location: 'Zone A — Turbine Hall', batteryLevel: 82, lastSeen: '2 min ago' },
    { id: 'ANYmal-C-107', name: 'ANYmal Beta',  status: 'charging',   location: 'Docking Station 3',    batteryLevel: 24, lastSeen: '8 min ago' },
    { id: 'ANYmal-C-093', name: 'ANYmal Gamma', status: 'error',      location: 'Zone C — Pump Room',   batteryLevel: 61, lastSeen: '1 min ago' },
    { id: 'ANYmal-C-055', name: 'ANYmal Delta', status: 'offline',    location: 'Maintenance Bay',       batteryLevel: 5,  lastSeen: '3 hrs ago' },
  ]);
}
