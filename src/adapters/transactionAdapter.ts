import { Transaction } from "../domain/entities";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const transformTransactions = (transactions: any[]): Transaction[] => {
  return transactions.map((transaction) => ({
    id: transaction.id,
    category: transaction.category,
    description: transaction.description,
    amount: transaction.amount,
    date: transaction.date,
    type: transaction.type,
  }));
};
