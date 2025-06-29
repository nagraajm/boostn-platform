import { Email } from '../value-objects/email.vo';

// Domain service for validation logic
export class ValidationService {
  public static validateEmail(email: string): boolean {
    try {
      new Email(email);
      return true;
    } catch {
      return false;
    }
  }

  public static validatePhoneNumber(phone: string): boolean {
    // Simple phone validation - can be enhanced based on requirements
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{8,20}$/;
    return phoneRegex.test(phone.trim());
  }

  public static validateRequired(value: string | undefined | null): boolean {
    return value !== undefined && value !== null && value.trim().length > 0;
  }

  public static validateMinLength(value: string, minLength: number): boolean {
    return !!value && value.length >= minLength;
  }

  public static validateMaxLength(value: string, maxLength: number): boolean {
    return !!value && value.length <= maxLength;
  }

  public static validateUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  public static validateCompanyRegistration(registration: string): boolean {
    // Simple validation - can be enhanced for specific country formats
    return this.validateRequired(registration) && registration.length >= 3;
  }

  public static validateAmount(amount: number): boolean {
    return amount > 0 && Number.isFinite(amount) && amount <= 1000000;
  }
}
