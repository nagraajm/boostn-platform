// Data Transfer Object for receipts
export interface ReceiptDto {
  transactionId: string;
  receiptNumber: string;
  clubName: string;
  clubAddress: string;
  supporterName: string;
  supporterAddress?: string;
  amount: string;
  currency: string;
  paymentMethod: string;
  transactionDate: string;
  taxAmount?: string;
  totalAmount?: string;
  description: string;
  type: 'DONATION' | 'PACKAGE_PURCHASE';
}
