import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { PaymentService } from '../services/payment.service';
import { PdfService } from '../services/pdf.service';
import { DonationDto } from '../dtos/donation.dto';
import { Transaction, TransactionType, TransactionStatus } from '../../domain/entities/transaction.entity';
import { Donation } from '../../domain/entities/donation.entity';
import { Supporter } from '../../domain/entities/supporter.entity';
import { Email } from '../../domain/value-objects/email.vo';
import { Money } from '../../domain/value-objects/money.vo';
import { PaymentMethod } from '../../domain/value-objects/payment-method.vo';
import { v4 as uuidv4 } from 'uuid';

export interface ProcessDonationResult {
  success: boolean;
  transaction?: Transaction;
  receiptUrl?: string;
  error?: string;
}

export class ProcessDonationUseCase {
  constructor(
    private transactionRepo: TransactionRepository,
    private paymentService: PaymentService,
    private pdfService: PdfService
  ) {}

  async execute(dto: DonationDto, clubId: string): Promise<ProcessDonationResult> {
    try {
      // 1. Create supporter
      const supporter = new Supporter(
        uuidv4(),
        dto.donorName,
        new Email(dto.email),
        undefined,
        undefined,
        undefined,
        dto.isAnonymous || false
      );

      // 2. Create donation
      const donation = new Donation(
        uuidv4(),
        new Money(dto.amount, dto.currency || 'EUR'),
        supporter.id,
        clubId,
        dto.message,
        dto.isRecurring || false,
        dto.recurringFrequency
      );

      // 3. Create payment method
      const paymentMethod = this.createPaymentMethod(dto.paymentMethod);

      // 4. Create transaction
      const transaction = new Transaction(
        uuidv4(),
        donation.amount,
        supporter.id,
        clubId,
        paymentMethod,
        TransactionType.DONATION,
        TransactionStatus.PENDING,
        undefined,
        donation.id
      );

      // 5. Process payment
      const paymentResult = await this.paymentService.processPayment({
        amount: donation.amount.amount,
        currency: donation.amount.currency,
        paymentMethod: dto.paymentMethod,
        description: `Donation to club`,
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
      const receiptUrl = await this.pdfService.generateDonationReceipt({
        transaction: completedTransaction,
        donation: donation,
        supporter: supporter
      });

      return {
        success: true,
        transaction: completedTransaction,
        receiptUrl
      };

    } catch (error) {
      console.error('Process donation error:', error);
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
