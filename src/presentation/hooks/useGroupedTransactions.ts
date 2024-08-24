import { useMemo, useState } from "react";
import dayjs from "dayjs";
import { useMonth } from "../hooks";
import {
  calculateTotals,
  filterTransactionsByMonth,
  groupAndSortTransactionsByDate,
} from "../utils";
import { Transaction } from "../../domain/entities";
import { transformTransactions } from "../../adapters";

interface TransactionStats {
  income: number;
  expenses: number;
  balance: number;
}

export const useGroupedTransactions = (transactions: Transaction[]) => {
  const { selectedMonth } = useMonth();
  const [transactionStats, setTransactionStats] = useState<TransactionStats>(
    {} as TransactionStats,
  );

  const groupedTransactions = useMemo(() => {
    const transformedData = transformTransactions(transactions);
    const filteredData = filterTransactionsByMonth(
      transformedData,
      selectedMonth?.month() ?? dayjs().month(),
    );
    const { income, expenses, balance } = calculateTotals(filteredData);
    setTransactionStats({ income, expenses, balance });
    return groupAndSortTransactionsByDate(filteredData);
  }, [transactions, selectedMonth]);

  return { groupedTransactions, transactionStats };
};
