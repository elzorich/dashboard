/**
 * Form Validators
 *
 * Pure functions: string → string (error message) | null (valid).
 *
 * WHY pure functions and not a class/service:
 *   - No dependencies → no need for Angular DI
 *   - Easily unit-testable: just call the function with a value
 *   - Tree-shakeable: only imported validators are bundled
 *   - Can be composed: combine multiple validators on one field
 *
 * SOLID principle → SRP: each validator does exactly ONE thing.
 */

/**
 * Returns an error message if the value is empty, null otherwise.
 */
export function required(value: string): string | null {
  return value.trim().length === 0 ? 'This field is required' : null;
}

/**
 * Returns an error message if the value is not a valid email, null otherwise.
 * Uses a practical regex — not RFC 5322 complete (intentionally simplified).
 */
export function email(value: string): string | null {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(value) ? null : 'Please enter a valid email address';
}

/**
 * Returns an error message if the value is shorter than `min` characters.
 * Returns null if valid.
 *
 * WHY a factory function (minLength(8)) instead of minLength(value, 8):
 *   This lets you compose: [required, minLength(8)] — same API for all validators.
 */
export function minLength(min: number) {
  return (value: string): string | null =>
    value.length >= min
      ? null
      : `Must be at least ${min} characters`;
}

/**
 * Returns an error message if the value exceeds `max` characters.
 */
export function maxLength(max: number) {
  return (value: string): string | null =>
    value.length <= max
      ? null
      : `Must be no more than ${max} characters`;
}

// ── Composition Helper ────────────────────────────────────────────────────────

/**
 * Runs multiple validators in order and returns the FIRST error found.
 * Returns null if all validators pass.
 *
 * WHY "first error only": showing all errors at once overwhelms users.
 * Show them one problem at a time, starting from the most fundamental.
 *
 * @example
 * const error = validate(value, [required, minLength(8)]);
 */
export function validate(
  value: string,
  validators: Array<(v: string) => string | null>
): string | null {
  for (const validator of validators) {
    const error = validator(value);
    if (error !== null) return error;
  }
  return null;
}
