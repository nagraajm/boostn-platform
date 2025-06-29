import { Transaction } from '../entities/transaction.entity';

// Repository interface for transactions
export interface TransactionRepository {
  findById(id: string): Promise<Transaction | null>;
  findBySupporterId(supporterId: string): Promise<Transaction[]>;
  findByClubId(clubId: string): Promise<Transaction[]>;
  save(transaction: Transaction): Promise<void>;
  update(transaction: Transaction): Promise<void>;
  delete(id: string): Promise<void>;
}
