import { Transaction, Category } from "../entities/Transaction";

export interface ILocalStorageTransactionRepository {
  getTransactions(): Promise<Transaction[]>;
  addTransaction(data: Transaction, selectedCategory: Category): Promise<Transaction>;
  updateTransaction(
    id: string,
    updatedData: Partial<Transaction>,
    selectedCategory: Category,
  ): Promise<Transaction | null>;
  deleteTransaction(id: string): Promise<void>;
}
