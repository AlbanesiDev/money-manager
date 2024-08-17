/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useMemo } from "react";
import { useAuth, useSigninCheck } from "reactfire";
import { Button, Flex } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { PlusOutlined } from "@ant-design/icons";
import {
  calculateTotals,
  filterTransactionsByMonth,
  groupAndSortTransactionsByDate,
} from "../../utils";
import { Transaction } from "../../../domain/entities";
import {
  Statistics,
  AuthModal,
  ProfileModal,
  Navbar,
  TransactionList,
  TransactionAdd,
  TransactionDelete,
  TransactionDetail,
  TransactionEdit,
} from "../../components";
import { AuthProviderModal, ProfileContextProvider } from "../../contexts";
import { transformTransactions } from "../../../adapters";
import { useTransactionModal } from "../../hooks";

import "./HomePage.css";
import { useAuthBasedTransactionService } from "../../../factories/useAuthBasedTransactionService ";
// import LazyLoad from "../../components/LazyLoad/LazyLoad";

const HomePage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [balance, setBalance] = useState(0);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const transactionService = useAuthBasedTransactionService();

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const { status, data: signInCheckResult } = useSigninCheck();
  const { openAddModal } = useTransactionModal();

  const fetchTransactions = async () => {
    const fetchedTransactions = await transactionService.getTransactions();
    setTransactions(fetchedTransactions);
  };

  const auth = useAuth();

  console.log("xd");

  useEffect(() => {
    fetchTransactions();

    const handleStorageChange = () => {
      fetchTransactions();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("localStorageUpdate", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("localStorageUpdate", handleStorageChange);
    };
  }, [auth.currentUser]);

  useEffect(() => {
    if (selectedDate) {
      const transformedData = transformTransactions(transactions);
      const filteredData = filterTransactionsByMonth(transformedData, selectedDate.month());
      const { income, expenses, balance } = calculateTotals(filteredData);
      setIncome(income);
      setExpenses(expenses);
      setBalance(balance);
    }
  }, [transactions, selectedDate]);

  const groupedTransactions = useMemo(() => {
    const transformedData = transformTransactions(transactions);
    const filteredData = filterTransactionsByMonth(
      transformedData,
      selectedDate?.month() ?? dayjs().month(),
    );
    return groupAndSortTransactionsByDate(filteredData);
  }, [transactions, selectedDate]);

  const renderSignInMessage = useMemo(
    () => (
      <div>
        <span className="sign_in_message">Por favor inicia sesión para no perder tus datos.</span>
      </div>
    ),
    [],
  );

  const justifyAddButton =
    status === "loading" ? "end" : signInCheckResult?.signedIn ? "end" : "space-between";

  return (
    <AuthProviderModal>
      <ProfileContextProvider>
        <div className="container">
          <Flex vertical gap={16}>
            <Navbar setSelectedDate={setSelectedDate} />
            <Statistics income={income} expenses={expenses} balance={balance} />

            <Flex justify={justifyAddButton} align="center">
              {status === "loading" ? (
                <></>
              ) : !signInCheckResult.signedIn ? (
                renderSignInMessage
              ) : null}

              <Button
                className="add_button"
                size="large"
                type="primary"
                icon={<PlusOutlined />}
                onClick={openAddModal}
              >
                Añadir
              </Button>
            </Flex>

            {Object.keys(groupedTransactions).map((date) => (
              <TransactionList key={date} date={date} data={groupedTransactions[date]} />
            ))}

            <TransactionAdd />
            <TransactionEdit />
            <TransactionDelete />
            <TransactionDetail />
            <ProfileModal />
            <AuthModal />
          </Flex>
          {/* <Footer /> */}
        </div>
      </ProfileContextProvider>
    </AuthProviderModal>
  );
};

export default HomePage;
