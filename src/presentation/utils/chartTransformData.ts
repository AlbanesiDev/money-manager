import { Transaction } from "../../domain/entities";

interface TransformedData {
  incomeData: { id: string; value: number; label: string; percentage: number }[];
  expenseData: { id: string; value: number; label: string; percentage: number }[];
}

export const transformData = (data: Transaction): TransformedData => {
  const incomeData: { id: string; value: number; label: string; percentage: number }[] = [];
  const expenseData: { id: string; value: number; label: string; percentage: number }[] = [];

  const incomeMap: { [key: string]: number } = {};
  const expenseMap: { [key: string]: number } = {};

  Object.values(data).forEach((transactions: Transaction[]) => {
    transactions.forEach((transaction) => {
      const { category, amount, type } = transaction;
      if (type === "income") {
        incomeMap[category!.label] = (incomeMap[category!.label] || 0) + amount;
      } else if (type === "expense") {
        expenseMap[category!.label] = (expenseMap[category!.label] || 0) + amount;
      }
    });
  });

  for (const [label, value] of Object.entries(incomeMap)) {
    incomeData.push({ id: label, value, label, percentage: 0 });
  }

  for (const [label, value] of Object.entries(expenseMap)) {
    expenseData.push({ id: label, value, label, percentage: 0 });
  }

  return {
    incomeData: incomeData,
    expenseData: expenseData,
  };
};
