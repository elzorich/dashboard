import {
  Component,
  ChangeDetectionStrategy,
  input,
  computed,
} from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Presentational button component.
 *
 * @example
 * ```html
 * <ui-button variant="primary">Click me</ui-button>
 * <ui-button variant="outline" [loading]="isSaving()">Save</ui-button>
 * <ui-button variant="secondary" [disabled]="!form.valid">Submit</ui-button>
 * ```
 */
@Component({
  selector: 'ui-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
    '[class.is-loading]': 'loading()',
    '[class.is-disabled]': 'disabled()',
  },
})
export class ButtonComponent {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly disabled = input<boolean>(false);
  readonly loading = input<boolean>(false);

  protected readonly hostClasses = computed(
    () => `ui-button ui-button--${this.variant()} ui-button--${this.size()}`
  );
}
