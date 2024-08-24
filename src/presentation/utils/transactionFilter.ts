import dayjs from "dayjs";
import { Transaction } from "../../domain/entities";

export const filterTransactionsByMonth = (
  transactions: Transaction[],
  month: number,
): Transaction[] => {
  return transactions.filter((transaction) => dayjs(transaction.date).month() === month);
};
