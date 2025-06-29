import { PackageRepository } from '../../domain/repositories/package.repository';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { PaymentService } from '../services/payment.service';
import { PdfService } from '../services/pdf.service';
import { PackagePurchaseDto } from '../dtos/package.dto';
import { Transaction, TransactionType, TransactionStatus } from '../../domain/entities/transaction.entity';
import { Supporter } from '../../domain/entities/supporter.entity';
import { Email } from '../../domain/value-objects/email.vo';
import { PaymentMethod, PaymentMethodType } from '../../domain/value-objects/payment-method.vo';
import { v4 as uuidv4 } from 'uuid';

export interface PurchasePackageResult {
  success: boolean;
  transaction?: Transaction;
  receiptUrl?: string;
  error?: string;
}

export class PurchasePackageUseCase {
  constructor(
    private packageRepo: PackageRepository,
    private transactionRepo: TransactionRepository,
    private paymentService: PaymentService,
    private pdfService: PdfService
  ) {}

  async execute(dto: PackagePurchaseDto): Promise<PurchasePackageResult> {
    try {
      // 1. Validate and get package
      const pkg = await this.packageRepo.findById(dto.packageId);
      if (!pkg) {
        return { success: false, error: 'Package not found' };
      }

      if (!pkg.isAvailable()) {
        return { success: false, error: 'Package is not available' };
      }

      // 2. Create supporter
      const supporter = new Supporter(
        uuidv4(),
        dto.contactPersonName,
        new Email(dto.email),
        dto.phone,
        dto.businessName,
        dto.companyRegistration
      );

      // 3. Create payment method
      const paymentMethod = this.createPaymentMethod(dto.paymentMethod);

      // 4. Create transaction
      const transaction = new Transaction(
        uuidv4(),
        pkg.price,
        supporter.id,
        pkg.clubId,
        paymentMethod,
        TransactionType.PACKAGE_PURCHASE,
        TransactionStatus.PENDING,
        pkg.id
      );

      // 5. Process payment
      const paymentResult = await this.paymentService.processPayment({
        amount: pkg.price.amount,
        currency: pkg.price.currency,
        paymentMethod: dto.paymentMethod,
        description: `Package purchase: ${pkg.name}`,
        customerEmail: dto.email
      });

      if (!paymentResult.success) {
        return { 
          success: false, 
          error: paymentResult.error || 'Payment processing failed' 
        };
      }

      // 6. Update transaction status
      const completedTransaction = new Transaction(
        transaction.id,
        transaction.amount,
        transaction.supporterId,
        transaction.clubId,
        transaction.paymentMethod,
        transaction.type,
        TransactionStatus.COMPLETED,
        transaction.packageId,
        transaction.donationId,
        transaction.receiptId,
        transaction.createdAt,
        new Date()
      );

      // 7. Save transaction
      await this.transactionRepo.save(completedTransaction);

      // 8. Generate receipt
      const receiptUrl = await this.pdfService.generatePackageReceipt({
        transaction: completedTransaction,
        package: pkg,
        supporter: supporter
      });

      return {
        success: true,
        transaction: completedTransaction,
        receiptUrl
      };

    } catch (error) {
      console.error('Purchase package error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  }

  private createPaymentMethod(type: string): PaymentMethod {
    switch (type) {
      case 'CREDIT_CARD':
        return PaymentMethod.creditCard();
      case 'PAYPAL':
        return PaymentMethod.paypal();
      case 'BANK_TRANSFER':
        return PaymentMethod.bankTransfer();
      default:
        throw new Error('Invalid payment method');
    }
  }
}
