import {
  Component,
  ChangeDetectionStrategy,
  input,
  computed,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { BadgeComponent, BadgeVariant } from '../badge/badge.component';

export type DeviceStatus = 'online' | 'offline' | 'inspecting' | 'charging' | 'error';

export interface Device {
  id: string;
  name: string;
  status: DeviceStatus;
  location: string;
  batteryLevel: number;
  lastSeen: string;
}

const STATUS_TO_BADGE: Record<DeviceStatus, BadgeVariant> = {
  online:     'success',
  inspecting: 'info',
  charging:   'warning',
  offline:    'neutral',
  error:      'error',
};

const STATUS_LABEL: Record<DeviceStatus, string> = {
  online:     'Online',
  inspecting: 'Inspecting',
  charging:   'Charging',
  offline:    'Offline',
  error:      'Error',
};

@Component({
  selector: 'ui-device-card',
  templateUrl: './device-card.component.html',
  styleUrl: './device-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCardModule, MatIconModule, MatDividerModule, BadgeComponent],
})
export class DeviceCardComponent {
  readonly device = input.required<Device>();

  protected readonly badgeVariant = computed(() => STATUS_TO_BADGE[this.device().status]);
  protected readonly statusLabel = computed(() => STATUS_LABEL[this.device().status]);

  protected readonly batteryIcon = computed(() => {
    const level = this.device().batteryLevel;
    if (level > 75) return 'battery_full';
    if (level > 50) return 'battery_5_bar';
    if (level > 25) return 'battery_3_bar';
    return 'battery_alert';
  });

  protected readonly batteryClass = computed(() => {
    const level = this.device().batteryLevel;
    if (level > 50) return 'battery--good';
    if (level > 25) return 'battery--low';
    return 'battery--critical';
  });
}
