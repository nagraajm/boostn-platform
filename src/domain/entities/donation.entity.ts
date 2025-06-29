import { Money } from '../value-objects/money.vo';

// Domain entity for donations
export class Donation {
  constructor(
    public readonly id: string,
    public readonly amount: Money,
    public readonly supporterId: string,
    public readonly clubId: string,
    public readonly message?: string,
    public readonly isRecurring: boolean = false,
    public readonly recurringFrequency?: 'monthly' | 'quarterly' | 'yearly',
    public readonly createdAt: Date = new Date()
  ) {}

  public getDisplayAmount(): string {
    return this.amount.format();
  }

  public isSignificant(): boolean {
    return this.amount.amount >= 100;
  }

  public getType(): 'one-time' | 'recurring' {
    return this.isRecurring ? 'recurring' : 'one-time';
  }
}
