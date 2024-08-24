import { useState, useEffect } from "react";
import { Transaction } from "../../domain/entities";
import { useAuthBasedTransactionService } from "../../factories/useAuthBasedTransactionService ";
import { useAuth } from "reactfire";

export const useFetchTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const transactionService = useAuthBasedTransactionService();
  const auth = useAuth();

  const fetchTransactions = async () => {
    const fetchedTransactions = await transactionService.getTransactions();
    setTransactions(fetchedTransactions);
  };

  const handleStorageChange = () => {
    fetchTransactions();
  };

  useEffect(() => {
    handleStorageChange();

    if (auth.currentUser === null) {
      window.addEventListener("storage", handleStorageChange);
      window.addEventListener("localStorageUpdate", handleStorageChange);

      return () => {
        window.removeEventListener("storage", handleStorageChange);
        window.removeEventListener("localStorageUpdate", handleStorageChange);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.currentUser]);

  return { transactions, fetchTransactions };
};
