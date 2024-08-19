import { createContext, useState, ReactNode } from "react";
import { Transaction } from "../../domain/entities";
import dayjs from "dayjs";

export interface TransactionModalContextType {
  modals: {
    isCategoryOpen: boolean;
    isDetailOpen: boolean;
    isAddOpen: boolean;
    isEditOpen: boolean;
    isDeleteOpen: boolean;
  };
  openDetailModal: (transaction: Transaction) => void;
  openCategoryModal: () => void;
  closeCategoryModal: () => void;
  selectedCategory: (category: Transaction["category"] | undefined) => void;
  openAddModal: () => void;
  openEditModal: (transaction: Transaction) => void;
  openDeleteModal: (id: string) => void;
  closeModal: (type: keyof TransactionModalContextType["modals"]) => void;
  selectedTransaction: Transaction;
  deleteId: string;
}

const initialTransaction: Transaction = {
  id: "",
  category: undefined,
  type: "income",
  amount: 0,
  date: dayjs(),
};

const TransactionModalContext = createContext<TransactionModalContextType | undefined>(undefined);

const TransactionModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modals, setModals] = useState({
    isDetailOpen: false,
    isAddOpen: false,
    isEditOpen: false,
    isDeleteOpen: false,
    isCategoryOpen: false,
  });

  const [selectedTransaction, setSelectedTransaction] = useState<Transaction>(initialTransaction);
  const [deleteId, setDeleteId] = useState<string>("");

  const openDetailModal = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setModals((prev) => ({ ...prev, isDetailOpen: true }));
  };

  const selectedCategory = (category: Transaction["category"]) => {
    setSelectedTransaction((prev) => ({ ...prev, category }));
  };

  const openCategoryModal = () => {
    setModals((prev) => ({ ...prev, isCategoryOpen: true }));
  };

  const openAddModal = () => {
    setModals((prev) => ({ ...prev, isAddOpen: true }));
  };

  const openEditModal = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setModals((prev) => ({ ...prev, isEditOpen: true }));
  };

  const openDeleteModal = (id: string) => {
    setDeleteId(id);
    setModals((prev) => ({ ...prev, isDeleteOpen: true }));
  };

  const closeCategoryModal = () => {
    setModals((prev) => ({ ...prev, isCategoryOpen: false }));
  };

  const closeModal = (type: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [type]: false }));
  };

  const value = {
    modals,
    openDetailModal,
    openAddModal,
    openEditModal,
    openDeleteModal,
    openCategoryModal,
    selectedCategory,
    closeCategoryModal,
    closeModal,
    selectedTransaction,
    deleteId,
  };

  return (
    <TransactionModalContext.Provider value={value}>{children}</TransactionModalContext.Provider>
  );
};

export { TransactionModalProvider, TransactionModalContext };
