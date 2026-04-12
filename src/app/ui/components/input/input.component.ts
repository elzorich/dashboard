import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  computed,
  signal,
} from '@angular/core';

//
// NEW vs Button:
//   output() → lets the component emit events UP to the parent
//   signal() → local mutable state INSIDE the component (unlike input() which comes FROM parent)
//
// in Button we only had: Component, ChangeDetectionStrategy, input, computed

// ── TYPES ─────────────────────────────────────────────────────────────────
// WHY: Type unions give us compile-time safety AND template autocomplete.
// 'search' is included because it triggers a search icon in mobile browsers.
export type InputType = 'text' | 'email' | 'password' | 'number' | 'search';

// ── UNIQUE ID COUNTER ──────────────────────────────────────────────────────
// WHY: Every <input> needs a unique `id` so the <label for="..."> can point
// to it. This is a CORE ACCESSIBILITY requirement.
// Without it: clicking the label won't focus the input (bad UX + bad a11y).
// We use a module-level counter (not inside the class) so it persists
// across component instances and increments globally.
let nextId = 0;

@Component({
  selector: 'ui-input',    // ← changed from app-input to ui-input (our convention)
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // ── HOST BINDINGS ──────────────────────────────────────────────────────
  // WHY host and not a wrapper div: cleaner DOM, easier to style from outside.
  host: {
    '[class]': 'hostClasses()',
  },
})
export class InputComponent {

  // ── INPUTS (from parent) ───────────────────────────────────────────────

  readonly label = input<string>('');
  // WHY string default '': if no label provided, we just don't render a <label>

  readonly placeholder = input<string>('');

  readonly type = input<InputType>('text');
  // WHY default 'text': the safest, most generic input type

  readonly disabled = input<boolean>(false);

  readonly error = input<string>('');
  // WHY string and not boolean: the parent provides the ERROR MESSAGE text,
  // not just a flag. This way the input can display exactly what went wrong.
  // "Email is required" vs "Invalid email format" — the dumb component just shows it.

  // ── OUTPUT (events up to parent) ──────────────────────────────────────
  // output() = the modern replacement for @Output() + EventEmitter
  // This emits the current string value every time the user types.
  // WHY string: we emit the VALUE, not the raw DOM Event. The parent gets
  // clean data, not an event object they have to unwrap themselves.
  readonly valueChange = output<string>();

  // ── LOCAL STATE (inside this component) ───────────────────────────────
  // signal() is for state that lives INSIDE this component — not from the parent.
  // Here: we track whether the user has ever interacted with the field.
  // WHY: we only show validation errors AFTER the user has "touched" the field.
  // Showing "Required" before the user even types is bad UX!
  protected readonly isTouched = signal(false);

  // The unique ID for this instance — connects <label> to <input> via `for`.
  protected readonly inputId = `ui-input-${nextId++}`;

  // ── COMPUTED (derived state — auto-recalculated) ───────────────────────
  // hasError: only true when:
  //   1. There IS an error message AND
  //   2. The user has already interacted (touched) the field
  // This prevents showing errors on a pristine form.
  protected readonly hasError = computed(
    () => this.error().length > 0 && this.isTouched()
  );

  // hostClasses: builds the CSS class string for the host element.
  // The SCSS then uses :host(.has-error) and :host(.is-disabled) selectors.
  protected readonly hostClasses = computed(() => {
    const classes = ['ui-input'];
    if (this.hasError()) classes.push('has-error');
    if (this.disabled()) classes.push('is-disabled');
    return classes.join(' ');
  });

  // ── ICON MAPPING ──────────────────────────────────────────────────────
  // A computed that maps the input TYPE to a unicode icon character.
  // WHY computed: auto-updates if `type` input changes.
  // WHY unicode/emoji: no icon library needed — zero extra dependencies.
  // In a real project you'd use an icon library (Lucide, Heroicons, etc.)
  protected readonly typeIcon = computed(() => {
    const icons: Record<InputType, string> = {
      text: '',       // no icon for generic text
      email: '✉',
      password: '🔒',
      number: '#',
      search: '🔍',
    };
    return icons[this.type()];
  });

  // ── EVENT HANDLERS ────────────────────────────────────────────────────

  // Called every time the user types in the field.
  // WHY we cast to HTMLInputElement: the DOM event target is typed as
  // EventTarget (generic), but we know it's an <input> element.
  protected onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.valueChange.emit(value);   // ← emit clean value to parent
  }

  // Called when the user leaves the field (blur event).
  // This is the moment we "mark the field as touched".
  // WHY blur and not input: we don't want to show errors while the user
  // is still typing — only after they leave the field.
  protected onBlur(): void {
    this.isTouched.set(true);   // ← signal.set() mutates local state
  }
}
