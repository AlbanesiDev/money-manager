import { useContext } from "react";
import { MonthContextType, MonthContext } from "../contexts/MonthContext";

const useMonth = (): MonthContextType => {
  const context = useContext(MonthContext);
  if (context === undefined) {
    throw new Error("useMonth must be used within a MonthProvider");
  }
  return context;
};

export { useMonth };
