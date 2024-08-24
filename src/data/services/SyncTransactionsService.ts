import { User } from "firebase/auth";
import {
  FirestoreTransactionRepository,
  LocalStorageTransactionRepository,
} from "../Infrastructure";
import { FirestoreTransactionUseCases, LocalStorageTransactionUseCases } from "../../usecases";
import { Transaction } from "../../domain/entities";

export class SyncTransactionsService {
  private storageKey: string = import.meta.env.VITE_REACT_APP_LOCALSTORAGE_KEY;
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

  public async detectSyncTransactions(): Promise<void> {
    const localStorageTransactions = await this.localStorageTransactionUseCases.getTransactions();
    if (localStorageTransactions.length > 0) {
      await this.wantsToSync(localStorageTransactions);
    } else {
      // Llamar al método getTransactions() en el componente homePage
    }
  }

  private async wantsToSync(transactions: Transaction[]): Promise<void> {
    const userConfirmed = window.confirm(
      "Tienes transacciones no guardadas. ¿Deseas sincronizarlas?",
    );
    if (userConfirmed) {
      await this.syncTransactions(transactions);
    } else {
      // Llamar al método getTransactions() en el componente homePage
    }
  }

  private async syncTransactions(transactions: Transaction[]): Promise<void> {
    if (this.user) {
      await this.firestoreTransactionUseCases.uploadTransactions(transactions);
    }

    localStorage.removeItem(this.storageKey);
  }
}
