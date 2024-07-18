export interface Transaction {
  id: string;
  category: Category;
  type: "income" | "expense";
  description?: string;
  amount: number;
  date: string;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
}
