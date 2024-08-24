import { Transaction } from "../entities/Transaction";

export interface ILocalStorageTransactionRepository {
  getTransactions(): Promise<Transaction[]>;
  addTransaction(data: Transaction): Promise<Transaction>;
  updateTransaction(id: string, updatedData: Partial<Transaction>): Promise<Transaction | null>;
  deleteTransaction(id: string): Promise<void>;
}
