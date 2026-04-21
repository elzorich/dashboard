import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from './ui/components/button';
import { InputComponent } from './ui/components/input';
import { BadgeComponent } from './ui/components/badge';
import { email, minLength, required, validate } from './shared/validators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonComponent, InputComponent, BadgeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class App {
  protected readonly title = signal('interview-prep-dashboard');

  // ── Button demo ───────────────────────────────────────────────────────────
  protected readonly isLoading = signal(false);

  protected simulateLoading(): void {
    this.isLoading.set(true);
    setTimeout(() => this.isLoading.set(false), 2000);
  }

  // ── Input demo ────────────────────────────────────────────────────────────

  protected readonly emailError = signal('');
  protected readonly passwordError = signal('');

  protected validateEmail(value: string): void {
    // validate() runs [required, email] in order, returns first error or null
    this.emailError.set(validate(value, [required, email]) ?? '');
  }

  protected validatePassword(value: string): void {
    this.passwordError.set(validate(value, [required, minLength(8)]) ?? '');
  }
}
