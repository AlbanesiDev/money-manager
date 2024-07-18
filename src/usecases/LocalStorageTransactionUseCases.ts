import { Transaction, Category } from "../domain/entities/Transaction";
import { ILocalStorageTransactionRepository } from "../domain/repositories/LocalStorageTransactionRepository";

export class LocalStorageTransactionUseCases {
  constructor(private transactionRepository: ILocalStorageTransactionRepository) {}

  public async getTransactions(): Promise<Transaction[]> {
    return this.transactionRepository.getTransactions();
  }

  public async addTransaction(data: Transaction, selectedCategory: Category): Promise<Transaction> {
    return this.transactionRepository.addTransaction(data, selectedCategory);
  }

  public async updateTransaction(
    id: string,
    updatedData: Partial<Transaction>,
    selectedCategory: Category,
  ): Promise<Transaction | null> {
    return this.transactionRepository.updateTransaction(id, updatedData, selectedCategory);
  }

  public async deleteTransaction(id: string): Promise<void> {
    return this.transactionRepository.deleteTransaction(id);
  }
}
