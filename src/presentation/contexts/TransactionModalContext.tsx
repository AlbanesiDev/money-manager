import { createContext, useState, ReactNode } from "react";
import { Category, Transaction } from "../../domain/entities/Transaction";

export interface TransactionModalContextType {
  modals: {
    isDetailOpen: boolean;
    isAddOpen: boolean;
    isEditOpen: boolean;
    isDeleteOpen: boolean;
  };
  openModal: (type: keyof TransactionModalContextType["modals"]) => void;
  closeModal: (type: keyof TransactionModalContextType["modals"]) => void;

  selectedTransaction: Transaction | null;
  setSelectedTransaction: (transaction: Transaction | null) => void;

  selectedCategory: Category | null;
  setSelectedCategory: (category: Category | null) => void;
  onSelectedCategory: (category: Category) => void;
}

const TransactionModalContext = createContext<TransactionModalContextType | undefined>(undefined);

const TransactionModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modals, setModals] = useState({
    isDetailOpen: false,
    isAddOpen: false,
    isEditOpen: false,
    isDeleteOpen: false,
  });

  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const openModal = (type: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [type]: true }));
  };

  const closeModal = (type: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [type]: false }));
  };

  const onSelectedCategory = (category: Category) => {
    setSelectedCategory(category);
  };

  const value = {
    modals,
    openModal,
    closeModal,
    selectedTransaction,
    setSelectedTransaction,
    selectedCategory,
    setSelectedCategory,
    onSelectedCategory,
  };

  return (
    <TransactionModalContext.Provider value={value}>{children}</TransactionModalContext.Provider>
  );
};

export { TransactionModalProvider, TransactionModalContext };
