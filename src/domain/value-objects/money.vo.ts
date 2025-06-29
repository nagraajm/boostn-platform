// Domain value object for monetary amounts
export class Money {
  constructor(
    public readonly amount: number,
    public readonly currency: string = 'EUR'
  ) {
    if (amount < 0) {
      throw new Error('Amount cannot be negative');
    }
  }

  public add(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new Error('Cannot add different currencies');
    }
    return new Money(this.amount + other.amount, this.currency);
  }

  public multiply(factor: number): Money {
    return new Money(this.amount * factor, this.currency);
  }

  public equals(other: Money): boolean {
    return this.amount === other.amount && this.currency === other.currency;
  }

  public format(): string {
    return new Intl.NumberFormat('en-DE', {
      style: 'currency',
      currency: this.currency,
    }).format(this.amount);
  }

  public toString(): string {
    return this.format();
  }
}
