import { Transaction } from '../../domain/entities/transaction.entity';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';

export class InMemoryTransactionRepository implements TransactionRepository {
  private transactions: Map<string, Transaction> = new Map();

  async findById(id: string): Promise<Transaction | null> {
    return this.transactions.get(id) || null;
  }

  async findBySupporterId(supporterId: string): Promise<Transaction[]> {
    return Array.from(this.transactions.values())
      .filter(transaction => transaction.supporterId === supporterId);
  }

  async findByClubId(clubId: string): Promise<Transaction[]> {
    return Array.from(this.transactions.values())
      .filter(transaction => transaction.clubId === clubId);
  }

  async save(transaction: Transaction): Promise<void> {
    this.transactions.set(transaction.id, transaction);
  }

  async update(transaction: Transaction): Promise<void> {
    if (this.transactions.has(transaction.id)) {
      this.transactions.set(transaction.id, transaction);
    } else {
      throw new Error('Transaction not found');
    }
  }

  async delete(id: string): Promise<void> {
    this.transactions.delete(id);
  }
}
