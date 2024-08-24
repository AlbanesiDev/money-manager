import dayjs from "dayjs";
import { Transaction } from "../../domain/entities";

export const groupAndSortTransactionsByDate = (transactions: Transaction[]) => {
  const grouped: { [key: string]: Transaction[] } = {};
  transactions.forEach((transaction) => {
    const date = dayjs(transaction.date).format("YYYY-MM-DD");
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(transaction);
  });

  // Sort transactions within each date group in descending order
  Object.keys(grouped).forEach((date) => {
    grouped[date].sort((a, b) => dayjs(b.date).diff(dayjs(a.date)));
  });

  // Sort dates in descending order
  const sortedDates = Object.keys(grouped).sort((a, b) => dayjs(b).diff(dayjs(a)));
  const sortedGrouped: { [key: string]: Transaction[] } = {};
  sortedDates.forEach((date) => {
    sortedGrouped[date] = grouped[date];
  });

  return sortedGrouped;
};
