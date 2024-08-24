import { Transaction } from "../entities/Transaction";

export interface IFirestoreTransactionRepository {
  getTransactions(): Promise<Transaction[]>;
  addTransaction(data: Transaction): Promise<Transaction>;
  uploadTransactions(transactions: Transaction[]): Promise<void>;
  updateTransaction(id: string, updatedData: Partial<Transaction>): Promise<Transaction | null>;
  deleteTransaction(id: string): Promise<void>;
}
