// Data Transfer Object for donations
export interface DonationDto {
  amount: number;
  currency?: string;
  donorName: string;
  email: string;
  message?: string;
  isAnonymous?: boolean;
  isRecurring?: boolean;
  recurringFrequency?: 'monthly' | 'quarterly' | 'yearly';
  paymentMethod: 'CREDIT_CARD' | 'PAYPAL' | 'BANK_TRANSFER';
}
