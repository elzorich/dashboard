/**
 * Pure validator functions: `(value: string) => string | null`
 * null = valid, string = error message.
 *
 * Use `validate()` to compose multiple validators on a single field.
 *
 * @example
 * validate(value, [required, email])
 * validate(value, [required, minLength(8)])
 */

export function required(value: string): string | null {
  return value.trim().length === 0 ? 'This field is required' : null;
}

export function email(value: string): string | null {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(value) ? null : 'Please enter a valid email address';
}

export function minLength(min: number) {
  return (value: string): string | null =>
    value.length >= min ? null : `Must be at least ${min} characters`;
}

export function maxLength(max: number) {
  return (value: string): string | null =>
    value.length <= max ? null : `Must be no more than ${max} characters`;
}

/** Runs validators in order, returns the first error found or null. */
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
