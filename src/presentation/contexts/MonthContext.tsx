import React, { createContext, useState, ReactNode } from "react";
import dayjs, { Dayjs } from "dayjs";

export interface MonthContextType {
  selectedMonth: Dayjs | null;
  setSelectedMonth: (date: Dayjs | null) => void;
}

const MonthContext = createContext<MonthContextType | undefined>(undefined);

const MonthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedMonth, setSelectedMonth] = useState<Dayjs | null>(dayjs());

  return (
    <MonthContext.Provider value={{ selectedMonth, setSelectedMonth }}>
      {children}
    </MonthContext.Provider>
  );
};

export { MonthContext, MonthProvider };
