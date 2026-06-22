import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  computed,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BadgeComponent, BadgeVariant } from '../../../ui/components/badge/badge.component';
import { Inspection as _Inspection } from '../../../models/inspection.model';
import { InputComponent } from '../../../ui/components/input';
import { InspectionService } from '../../../core/services/inspection.service';
import { Inspection, InspectionStatus } from '../../../models/inspection.model';
import { debounceTime, distinctUntilChanged, switchMap, startWith, tap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

const STATUS_BADGE: Record<InspectionStatus, BadgeVariant> = {
  ok:       'success',
  warning:  'warning',
  critical: 'error',
  pending:  'neutral',
};

@Component({
  selector: 'app-inspection-table',
  templateUrl: './inspection-table.component.html',
  styleUrl: './inspection-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatTableModule,
    MatSortModule,
    MatProgressBarModule,
    ScrollingModule,
    BadgeComponent,
    InputComponent,
  ],
})
export class InspectionTableComponent {

  private readonly inspectionService = inject(InspectionService);

  protected readonly columns = ['id', 'deviceName', 'location', 'status', 'temperature', 'duration', 'timestamp'];
  protected readonly searchQuery = signal('');
  protected readonly sortState = signal<Sort>({ active: 'timestamp', direction: 'desc' });
  protected readonly isLoading = signal(true);

  protected getBadgeVariant(status: string): BadgeVariant {
    return STATUS_BADGE[status as InspectionStatus] ?? 'neutral';
  }

  // Search: debounce 300ms, skip duplicate values, then fetch
  private readonly search$ = toObservable(this.searchQuery).pipe(
    debounceTime(300),
    distinctUntilChanged(),
  );

  // All inspections from the service — refetches when search changes
  // In a real app this query would go to the API with search params
  private readonly allInspections$ = this.search$.pipe(
    startWith(''),
    switchMap(() => {
      this.isLoading.set(true);
      return this.inspectionService.getInspections();
    }),
    tap(data => {
      this.isLoading.set(false);
      return data;
    }),
  );

  private readonly allInspections = toSignal(this.allInspections$, { initialValue: [] });

  // Filter client-side by search query, then sort
  protected readonly rows = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const sort = this.sortState();

    const filtered = query
      ? this.allInspections().filter(row =>
          row.deviceName.toLowerCase().includes(query) ||
          row.location.toLowerCase().includes(query) ||
          row.id.toLowerCase().includes(query)
        )
      : this.allInspections();

    if (!sort.active || sort.direction === '') return filtered;

    return [...filtered].sort((a, b) => {
      const dir = sort.direction === 'asc' ? 1 : -1;
      const valA = a[sort.active as keyof Inspection];
      const valB = b[sort.active as keyof Inspection];
      return valA < valB ? -dir : valA > valB ? dir : 0;
    });
  });


  protected onSearch(value: string): void {
    this.searchQuery.set(value);
  }

  protected onSort(sort: Sort): void {
    this.sortState.set(sort);
  }

  protected formatTemp(value: number): string {
    return `${value.toFixed(1)}°C`;
  }

  protected formatDuration(minutes: number): string {
    return minutes === 0 ? '—' : `${minutes}m`;
  }

  protected formatTimestamp(iso: string): string {
    return new Date(iso).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  }
}
