// Data Transfer Object for package purchases
export interface PackagePurchaseDto {
  packageId: string;
  businessName: string;
  contactPersonName: string;
  email: string;
  phone?: string;
  companyRegistration?: string;
  paymentMethod: 'CREDIT_CARD' | 'PAYPAL' | 'BANK_TRANSFER';
}
