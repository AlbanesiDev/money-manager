import {
  getFirestore,
  collection,
  query,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
  setDoc,
  arrayUnion,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "../../config/firebase.config";
import { Transaction } from "../../domain/entities/Transaction";
import { IFirestoreTransactionRepository } from "../../domain/repositories/FirestoreTransactionRepository";
import { v4 as uuidv4 } from "uuid";

export class FirestoreTransactionRepository implements IFirestoreTransactionRepository {
  private db = getFirestore(app);
  private collectionName = "users";

  public async getTransactions(): Promise<Transaction[]> {
    const auth = getAuth(app);
    const user = auth.currentUser;

    if (!user) {
      throw new Error("No authenticated user found.");
    }

    const userId = user.uid;
    const q = query(collection(this.db, this.collectionName, userId, "transactions"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data() as Transaction);
  }

  public async addTransaction(data: Transaction): Promise<Transaction> {
    const auth = getAuth(app);
    const user = auth.currentUser;

    if (!user) {
      throw new Error("No authenticated user found.");
    }

    const userId = user.uid;
    const userDocRef = doc(this.db, this.collectionName, userId);

    const newTransaction = {
      ...data,
      id: uuidv4(),
    };

    await updateDoc(userDocRef, {
      transactions: arrayUnion(newTransaction),
    });

    return newTransaction;
  }

  public async uploadTransactions(transactions: Transaction[]): Promise<void> {
    const auth = getAuth(app);
    const user = auth.currentUser;

    if (!user) {
      throw new Error("No authenticated user found.");
    }

    const userId = user.uid;
    const userDocRef = doc(this.db, this.collectionName, userId);
    const transactionsCollectionRef = collection(userDocRef, "transactions");

    const batch = transactions.map(async (transaction) => {
      const transactionDocRef = doc(transactionsCollectionRef, transaction.id.toString());
      await setDoc(transactionDocRef, transaction);
    });
    await Promise.all(batch);
  }

  public async updateTransaction(
    id: string,
    updatedData: Partial<Transaction>,
  ): Promise<Transaction | null> {
    const auth = getAuth(app);
    const user = auth.currentUser;

    if (!user) {
      throw new Error("No authenticated user found.");
    }

    const userId = user.uid;
    const transactionDocRef = doc(this.db, this.collectionName, userId, "transactions", id);

    await updateDoc(transactionDocRef, {
      ...updatedData,
    });

    const updatedDoc = await getDoc(transactionDocRef);
    return updatedDoc.exists() ? (updatedDoc.data() as Transaction) : null;
  }

  public async deleteTransaction(id: string): Promise<void> {
    const auth = getAuth(app);
    const user = auth.currentUser;

    if (!user) {
      throw new Error("No authenticated user found.");
    }

    const userId = user.uid;
    const transactionDocRef = doc(this.db, this.collectionName, userId, "transactions", id);

    await deleteDoc(transactionDocRef);
  }
}
