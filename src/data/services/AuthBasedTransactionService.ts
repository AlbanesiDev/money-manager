import { User } from "firebase/auth";
import { ITransactionService } from "../../domain/repositories/TransactionService";
import { Transaction } from "../../domain/entities/Transaction";
import { FirestoreTransactionUseCases } from "../../usecases/FirestoreTransactionUseCases";
import { LocalStorageTransactionUseCases } from "../../usecases/LocalStorageTransactionUseCases";
import { FirestoreTransactionRepository } from "../Infrastructure/FirestoreTransactionRepository";
import { LocalStorageTransactionRepository } from "../Infrastructure/LocalStorageTransactionRepository";

export class AuthBasedTransactionService implements ITransactionService {
  private localStorageTransactionUseCases: LocalStorageTransactionUseCases;
  private firestoreTransactionUseCases: FirestoreTransactionUseCases;

  constructor(private user: User | null) {
    const localStorageTransactionRepository = new LocalStorageTransactionRepository();
    const firestoreTransactionRepository = new FirestoreTransactionRepository();

    this.localStorageTransactionUseCases = new LocalStorageTransactionUseCases(
      localStorageTransactionRepository,
    );
    this.firestoreTransactionUseCases = new FirestoreTransactionUseCases(
      firestoreTransactionRepository,
    );
  }

  async getTransactions(): Promise<Transaction[]> {
    if (this.user) {
      return this.firestoreTransactionUseCases.getTransactions();
    } else {
      return this.localStorageTransactionUseCases.getTransactions();
    }
  }

  async addTransaction(data: Transaction): Promise<Transaction> {
    if (this.user) {
      return this.firestoreTransactionUseCases.addTransaction(data);
    } else {
      return this.localStorageTransactionUseCases.addTransaction(data);
    }
  }

  async updateTransaction(
    id: string,
    updatedData: Partial<Transaction>,
  ): Promise<Transaction | null> {
    if (this.user) {
      return this.firestoreTransactionUseCases.updateTransaction(id, updatedData);
    } else {
      return this.localStorageTransactionUseCases.updateTransaction(id, updatedData);
    }
  }

  async deleteTransaction(id: string): Promise<void> {
    if (this.user) {
      return this.firestoreTransactionUseCases.deleteTransaction(id);
    } else {
      return this.localStorageTransactionUseCases.deleteTransaction(id);
    }
  }
}
