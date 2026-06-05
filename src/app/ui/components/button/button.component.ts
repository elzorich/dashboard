import {
  Component,
  ChangeDetectionStrategy,
  input,
  computed,
} from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

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
