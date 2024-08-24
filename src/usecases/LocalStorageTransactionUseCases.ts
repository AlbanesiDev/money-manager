import { Transaction } from "../domain/entities/Transaction";
import { ILocalStorageTransactionRepository } from "../domain/repositories/LocalStorageTransactionRepository";

export class LocalStorageTransactionUseCases {
  constructor(private transactionRepository: ILocalStorageTransactionRepository) {}

  public async getTransactions(): Promise<Transaction[]> {
    return this.transactionRepository.getTransactions();
  }

  public async addTransaction(data: Transaction): Promise<Transaction> {
    return this.transactionRepository.addTransaction(data);
  }

  public async updateTransaction(
    id: string,
    updatedData: Partial<Transaction>,
  ): Promise<Transaction | null> {
    return this.transactionRepository.updateTransaction(id, updatedData);
  }

  public async deleteTransaction(id: string): Promise<void> {
    return this.transactionRepository.deleteTransaction(id);
  }
}
