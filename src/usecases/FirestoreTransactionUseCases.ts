import { Transaction, Category } from "../domain/entities/Transaction";
import { IFirestoreTransactionRepository } from "../domain/repositories/FirestoreTransactionRepository";

export class FirestoreTransactionUseCases {
  constructor(private transactionRepository: IFirestoreTransactionRepository) {}

  public async getTransactions(): Promise<Transaction[]> {
    return await this.transactionRepository.getTransactions();
  }

  public async addTransaction(data: Transaction, selectedCategory: Category): Promise<Transaction> {
    return await this.transactionRepository.addTransaction(data, selectedCategory);
  }

  public async uploadTransactions(transactions: Transaction[]): Promise<void> {
    return await this.transactionRepository.uploadTransactions(transactions);
  }

  public async updateTransaction(
    id: string,
    updatedData: Partial<Transaction>,
    selectedCategory: Category,
  ): Promise<Transaction | null> {
    return await this.transactionRepository.updateTransaction(id, updatedData, selectedCategory);
  }

  public async deleteTransaction(id: string): Promise<void> {
    return await this.transactionRepository.deleteTransaction(id);
  }
}
