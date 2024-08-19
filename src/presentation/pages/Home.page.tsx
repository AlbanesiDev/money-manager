/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useMemo, lazy, Suspense } from "react";
import { useAuth, useSigninCheck } from "reactfire";
import { Button, Flex } from "antd";
import dayjs from "dayjs";
import { PlusOutlined } from "@ant-design/icons";
import {
  calculateTotals,
  filterTransactionsByMonth,
  groupAndSortTransactionsByDate,
} from "../utils";
import { Transaction } from "../../domain/entities";
import { Statistics, TransactionList, TransactionAdd } from "../components";

import { transformTransactions } from "../../adapters";
import { useTransactionModal, useView, useMonth } from "../hooks";

import { useAuthBasedTransactionService } from "../../factories/useAuthBasedTransactionService ";

const HomePage: React.FC = () => {
  const { selectedMonth } = useMonth();
  const { viewMode } = useView();
  const auth = useAuth();

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

  const Charts = lazy(() => import("../components/Charts/Charts"));

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
    if (selectedMonth) {
      const transformedData = transformTransactions(transactions);
      const filteredData = filterTransactionsByMonth(transformedData, selectedMonth.month());
      const { income, expenses, balance } = calculateTotals(filteredData);
      setIncome(income);
      setExpenses(expenses);
      setBalance(balance);
    }
  }, [transactions, selectedMonth]);

  const groupedTransactions = useMemo(() => {
    const transformedData = transformTransactions(transactions);
    const filteredData = filterTransactionsByMonth(
      transformedData,
      selectedMonth?.month() ?? dayjs().month(),
    );
    return groupAndSortTransactionsByDate(filteredData);
  }, [transactions, selectedMonth]);

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
    <>
      {!viewMode ? (
        <>
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
        </>
      ) : (
        <Suspense fallback={<></>}>
          <Charts data={groupedTransactions} />
        </Suspense>
      )}
    </>
  );
};

export default HomePage;
