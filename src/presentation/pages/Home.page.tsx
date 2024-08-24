import React, { lazy, Suspense, useMemo } from "react";
import { useSigninCheck } from "reactfire";
import { Button, Card, Flex, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Statistics, TransactionList } from "../components";
import { useTransactionModal, useView } from "../hooks";
import { useFetchTransactions } from "../hooks/useFetchTransactions";
import { useGroupedTransactions } from "../hooks/useGroupedTransactions";

const Charts = lazy(() => import("../components/charts/Charts.component"));
// const SyncModal = lazy(() => import("../components/sync-modal/SyncModal.component"));
const TransactionAdd = lazy(
  () => import("../components/transactions/transaction-modal/TransactionAdd.component"),
);

const { Text } = Typography;

const HomePage: React.FC = () => {
  const { transactions } = useFetchTransactions();
  const { groupedTransactions, transactionStats } = useGroupedTransactions(transactions);
  const { status, data: signInCheckResult } = useSigninCheck();

  const { openAddModal } = useTransactionModal();
  const { viewMode } = useView();

  const justifyAddButton =
    status === "loading" || Object.keys(groupedTransactions).length === 0
      ? "end"
      : signInCheckResult?.signedIn
        ? "end"
        : "space-between";
  const renderSignInMessage = useMemo(
    () => <Text type="danger">Por favor inicia sesión para no perder tus datos.</Text>,
    [],
  );

  const groupedTransactionsLength = Object.keys(groupedTransactions).length === 0 ? true : false;

  return (
    <>
      {!viewMode ? (
        <>
          <Statistics
            income={transactionStats.income}
            expenses={transactionStats.expenses}
            balance={transactionStats.balance}
          />

          <Flex justify={justifyAddButton} align="center">
            {groupedTransactionsLength || status === "loading" ? (
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

          <TransactionList groupedTransactions={groupedTransactions} />

          {groupedTransactionsLength && (
            <Card style={{ width: "100%" }}>
              <Flex justify="center" align="center">
                <Text type="warning">No hay transacciones.</Text>
              </Flex>
            </Card>
          )}
          <Suspense>
            <TransactionAdd />
          </Suspense>
        </>
      ) : (
        <Suspense>
          <Charts data={groupedTransactions} />
        </Suspense>
      )}
      <Suspense>{/* <SyncModal /> */}</Suspense>
    </>
  );
};

export default HomePage;
