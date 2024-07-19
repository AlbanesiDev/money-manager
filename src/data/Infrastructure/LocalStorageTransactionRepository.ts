import { v4 as uuidv4 } from "uuid";
import { Transaction, Category } from "../../domain/entities";
import { ILocalStorageTransactionRepository } from "../../domain/repositories";
import { getLocalStorageItem, setLocalStorageItem } from "../../presentation/utils";

export class LocalStorageTransactionRepository implements ILocalStorageTransactionRepository {
  private storageKey: string = import.meta.env.VITE_REACT_APP_LOCALSTORAGE_KEY;

  public async getTransactions(): Promise<Transaction[]> {
    return getLocalStorageItem(this.storageKey) || [];
  }

  public async addTransaction(
    transaction: Transaction,
    selectedCategory: Category,
  ): Promise<Transaction> {
    const transactionId = uuidv4();
    const newTransaction: Transaction = {
      id: transactionId,
      description: transaction.description || "",
      amount: transaction.amount,
      date: transaction.date,
      type: transaction.type as "income" | "expense",
      category: selectedCategory,
    };

    const transactions = await this.getTransactions();
    transactions.push(newTransaction);

    setLocalStorageItem(this.storageKey, transactions);
    return newTransaction;
  }

  public async updateTransaction(
    id: string,
    updatedData: Partial<Transaction>,
    selectedCategory: Category,
  ): Promise<Transaction | null> {
    const transactions = await this.getTransactions();
    const updatedTransactions = transactions.map((transaction) => {
      if (transaction.id === id) {
        return {
          ...transaction,
          ...updatedData,
          category: selectedCategory,
          date: updatedData.date || transaction.date,
          amount: updatedData.amount ?? transaction.amount,
          description: updatedData.description ?? transaction.description,
          type: (updatedData.type as "income" | "expense") || transaction.type,
        };
      }
      return transaction;
    });
    setLocalStorageItem(this.storageKey, updatedTransactions);
    return updatedTransactions.find((transaction) => transaction.id === id) || null;
  }

  public async deleteTransaction(id: string): Promise<void> {
    const transactions = await this.getTransactions();
    const updatedTransactions = transactions.filter((transaction) => transaction.id !== id);
    setLocalStorageItem(this.storageKey, updatedTransactions);
  }
}
