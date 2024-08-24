import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Dayjs } from "dayjs";

export interface Transaction {
  id: string;
  date: Dayjs;
  type: "income" | "expense";
  category: Category;
  amount: number;
  description?: string;
}

export interface Category {
  label: string;
  icon: IconProp;
}
