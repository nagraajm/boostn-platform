// Domain value object for payment methods
export enum PaymentMethodType {
  CREDIT_CARD = 'CREDIT_CARD',
  PAYPAL = 'PAYPAL',
  BANK_TRANSFER = 'BANK_TRANSFER'
}

export class PaymentMethod {
  constructor(
    public readonly type: PaymentMethodType,
    public readonly displayName: string,
    public readonly isEnabled: boolean = true
  ) {}

  public static creditCard(): PaymentMethod {
    return new PaymentMethod(PaymentMethodType.CREDIT_CARD, 'Credit Card');
  }

  public static paypal(): PaymentMethod {
    return new PaymentMethod(PaymentMethodType.PAYPAL, 'PayPal');
  }

  public static bankTransfer(): PaymentMethod {
    return new PaymentMethod(PaymentMethodType.BANK_TRANSFER, 'Bank Transfer');
  }

  public equals(other: PaymentMethod): boolean {
    return this.type === other.type;
  }
}
