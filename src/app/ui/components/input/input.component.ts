import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  computed,
  signal,
} from '@angular/core';

export type InputType = 'text' | 'email' | 'password' | 'number' | 'search';

let nextId = 0;

@Component({
  selector: 'ui-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
  },
})
export class InputComponent {
  readonly label = input<string>('');
  readonly placeholder = input<string>('');
  readonly type = input<InputType>('text');
  readonly disabled = input<boolean>(false);
  readonly error = input<string>('');

  readonly valueChange = output<string>();

  protected readonly isTouched = signal(false);
  protected readonly inputId = `ui-input-${nextId++}`;

  protected readonly hasError = computed(
    () => this.error().length > 0 && this.isTouched()
  );

  protected readonly hostClasses = computed(() => {
    const classes = ['ui-input'];
    if (this.hasError()) classes.push('has-error');
    if (this.disabled()) classes.push('is-disabled');
    return classes.join(' ');
  });

  protected readonly typeIcon = computed(() => {
    const icons: Record<InputType, string> = {
      text: '',
      email: '✉',
      password: '🔒',
      number: '#',
      search: '🔍',
    };
    return icons[this.type()];
  });

  protected onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.valueChange.emit(value);
  }

  protected onBlur(): void {
    this.isTouched.set(true);
  }
}
