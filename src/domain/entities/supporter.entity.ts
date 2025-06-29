import { Email } from '../value-objects/email.vo';

// Domain entity for supporters (donors/sponsors)
export class Supporter {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: Email,
    public readonly phone?: string,
    public readonly companyName?: string,
    public readonly companyRegistration?: string,
    public readonly isAnonymous: boolean = false,
    public readonly createdAt: Date = new Date()
  ) {}

  public getDisplayName(): string {
    if (this.isAnonymous) {
      return 'Anonymous Supporter';
    }
    return this.companyName || this.name;
  }

  public isBusiness(): boolean {
    return !!this.companyName;
  }

  public getContactInfo(): {
    name: string;
    email: string;
    phone?: string;
    company?: string;
  } {
    return {
      name: this.name,
      email: this.email.toString(),
      phone: this.phone,
      company: this.companyName
    };
  }
}
