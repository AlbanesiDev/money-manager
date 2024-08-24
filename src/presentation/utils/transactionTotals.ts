import { Transaction } from "../../domain/entities";

export const calculateTotals = (transactions: Transaction[]) => {
  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  return {
    income: totalIncome,
    expenses: totalExpenses,
    balance: totalIncome - totalExpenses,
  };
};
