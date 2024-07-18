import { Transaction, Category } from "../entities/Transaction";

export interface IFirestoreTransactionRepository {
  getTransactions(): Promise<Transaction[]>;
  addTransaction(data: Transaction, selectedCategory: Category): Promise<Transaction>;
  uploadTransactions(transactions: Transaction[]): Promise<void>;
  updateTransaction(
    id: string,
    updatedData: Partial<Transaction>,
    selectedCategory: Category,
  ): Promise<Transaction | null>;
  deleteTransaction(id: string): Promise<void>;
}
