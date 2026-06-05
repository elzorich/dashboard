import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  computed,
  signal,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

export type InputType = 'text' | 'email' | 'password' | 'number' | 'search';
export type InputAppearance = 'outline' | 'fill';

let nextId = 0;

const TYPE_ICON: Record<InputType, string> = {
  text:     '',
  email:    'mail',
  password: 'lock',
  number:   'tag',
  search:   'search',
};

@Component({
  selector: 'ui-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  readonly label = input<string>('');
  readonly placeholder = input<string>('');
  readonly type = input<InputType>('text');
  readonly disabled = input<boolean>(false);
  readonly error = input<string>('');
  readonly appearance = input<InputAppearance>('outline');
  readonly valueChange = output<string>();

  protected readonly value = signal<string>('');
  protected readonly isTouched = signal(false);
  protected readonly isDisabledFromForms = signal(false);
  protected readonly inputId = `ui-input-${nextId++}`;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  protected readonly hasError = computed(
    () => this.error().length > 0 && this.isTouched()
  );

  protected readonly isDisabled = computed(
    () => this.disabled() || this.isDisabledFromForms()
  );

  protected readonly iconName = computed(() => TYPE_ICON[this.type()]);

  // Tells Material when to show the error state — reads our own hasError() signal
  // so it works for both standalone usage ([error] input) and reactive forms
  protected readonly errorStateMatcher: ErrorStateMatcher = {
    isErrorState: () => this.hasError(),
  };

  writeValue(value: string): void {
    this.value.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabledFromForms.set(isDisabled);
  }

  protected onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value.set(value);
    this.onChange(value);
    this.valueChange.emit(value);
  }

  protected onBlur(): void {
    this.isTouched.set(true);
    this.onTouched();
  }
}
