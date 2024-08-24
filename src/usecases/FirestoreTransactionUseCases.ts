import { Transaction } from "../domain/entities/Transaction";
import { IFirestoreTransactionRepository } from "../domain/repositories/FirestoreTransactionRepository";

export class FirestoreTransactionUseCases {
  constructor(private transactionRepository: IFirestoreTransactionRepository) {}

  public async getTransactions(): Promise<Transaction[]> {
    return await this.transactionRepository.getTransactions();
  }

  public async addTransaction(data: Transaction): Promise<Transaction> {
    return await this.transactionRepository.addTransaction(data);
  }

  public async uploadTransactions(transactions: Transaction[]): Promise<void> {
    return await this.transactionRepository.uploadTransactions(transactions);
  }

  public async updateTransaction(
    id: string,
    updatedData: Partial<Transaction>,
  ): Promise<Transaction | null> {
    return await this.transactionRepository.updateTransaction(id, updatedData);
  }

  public async deleteTransaction(id: string): Promise<void> {
    return await this.transactionRepository.deleteTransaction(id);
  }
}
