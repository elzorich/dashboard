import {
  Component,
  ChangeDetectionStrategy,
  input,
  computed,
} from '@angular/core';

/**
 * Variant determines the visual style of the button.
 * Adding a new variant (e.g. 'danger') only requires a new CSS class —
 * no changes to this TypeScript file (Open-Closed Principle).
 */
export type ButtonVariant = 'primary' | 'secondary' | 'outline';

/**
 * Size controls padding and font-size via CSS modifier classes.
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * A presentational (dumb) button component for the Design System.
 *
 * Responsibilities:
 * - Render a styled `<button>` element
 * - Reflect variant, size, disabled, and loading states visually
 * - Provide accessible feedback for screen readers
 *
 * NOT responsible for:
 * - Business logic, HTTP calls, or navigation
 * - Managing its own state beyond what inputs provide
 *
 * @example
 * ```html
 * <ui-button variant="primary" size="md">Click me</ui-button>
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
    // Classes are applied to the host <ui-button> element itself,
    // so consumers can position and style it naturally without wrapper divs.
    '[class]': 'hostClasses()',
    '[class.is-loading]': 'loading()',
    '[class.is-disabled]': 'disabled()',
  },
})
export class ButtonComponent {
  /** Visual style variant. Defaults to 'primary'. */
  readonly variant = input<ButtonVariant>('primary');

  /** Size of the button. Defaults to 'md'. */
  readonly size = input<ButtonSize>('md');

  /** Whether the button is disabled. */
  readonly disabled = input<boolean>(false);

  /** Whether the button is in a loading state (shows spinner, disables interaction). */
  readonly loading = input<boolean>(false);

  /**
   * Computed CSS classes applied to the host element.
   * This is derived state — it recalculates only when variant() or size() change.
   */
  protected readonly hostClasses = computed(
    () => `ui-button ui-button--${this.variant()} ui-button--${this.size()}`
  );
}
