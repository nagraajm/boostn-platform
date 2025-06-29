import { Money } from '../value-objects/money.vo';
import { PaymentMethod } from '../value-objects/payment-method.vo';

// Domain entity for transactions
export class Transaction {
  constructor(
    public readonly id: string,
    public readonly amount: Money,
    public readonly supporterId: string,
    public readonly clubId: string,
    public readonly paymentMethod: PaymentMethod,
    public readonly type: TransactionType,
    public readonly status: TransactionStatus,
    public readonly packageId?: string,
    public readonly donationId?: string,
    public readonly receiptId?: string,
    public readonly createdAt: Date = new Date(),
    public readonly completedAt?: Date,
    public readonly failureReason?: string
  ) {}

  public isComplete(): boolean {
    return this.status === TransactionStatus.COMPLETED;
  }

  public isFailed(): boolean {
    return this.status === TransactionStatus.FAILED;
  }

  public isPending(): boolean {
    return this.status === TransactionStatus.PENDING;
  }

  public getDisplayAmount(): string {
    return this.amount.format();
  }

  public getStatusDisplay(): string {
    switch (this.status) {
      case TransactionStatus.PENDING:
        return 'Processing...';
      case TransactionStatus.COMPLETED:
        return 'Completed';
      case TransactionStatus.FAILED:
        return 'Failed';
      case TransactionStatus.CANCELLED:
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  }
}

export enum TransactionType {
  DONATION = 'DONATION',
  PACKAGE_PURCHASE = 'PACKAGE_PURCHASE'
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED'
}
