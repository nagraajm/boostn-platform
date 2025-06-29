import { DIContainer } from './container';
import { InMemoryClubRepository } from '../repositories/in-memory-club.repository';
import { InMemoryPackageRepository } from '../repositories/in-memory-package.repository';
import { InMemoryTransactionRepository } from '../repositories/in-memory-transaction.repository';
import { PaymentService } from '../../application/services/payment.service';
import { PdfService } from '../../application/services/pdf.service';
import { PurchasePackageUseCase } from '../../application/use-cases/purchase-package.use-case';
import { ProcessDonationUseCase } from '../../application/use-cases/process-donation.use-case';

// Setup dependency injection
export function setupDI(): void {
  const container = DIContainer.getInstance();

  // Repositories (Singletons)
  container.registerSingleton('ClubRepository', () => new InMemoryClubRepository());
  container.registerSingleton('PackageRepository', () => new InMemoryPackageRepository());
  container.registerSingleton('TransactionRepository', () => new InMemoryTransactionRepository());

  // Services (Singletons)
  container.registerSingleton('PaymentService', () => new PaymentService());
  container.registerSingleton('PdfService', () => new PdfService());

  // Use Cases
  container.register('PurchasePackageUseCase', () => new PurchasePackageUseCase(
    container.resolve('PackageRepository'),
    container.resolve('TransactionRepository'),
    container.resolve('PaymentService'),
    container.resolve('PdfService')
  ));

  container.register('ProcessDonationUseCase', () => new ProcessDonationUseCase(
    container.resolve('TransactionRepository'),
    container.resolve('PaymentService'),
    container.resolve('PdfService')
  ));
}
