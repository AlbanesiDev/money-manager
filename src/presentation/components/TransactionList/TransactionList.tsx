import { Button, Card, Flex, List, Modal } from "antd";
import Icon from "../Icon/Icon";
import { DeleteFilled, EditOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import "./TransactionList.css";
import { useState } from "react";
import { Transaction } from "../../../domain/entities/Transaction";

interface PropType {
  data: Transaction[];
  date: string;
}

const formatCurrency = (amount: number) => {
  const parts = amount.toFixed(2).toString().split(".");
  const formattedInt = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `$${formattedInt},${parts[1]}`;
};

const TransactionList: React.FC<PropType> = ({ data, date }) => {
  const { confirm } = Modal;

  const deleteTransaction = (id: string) => {
    const mockData = localStorage.getItem("transactionMock");

    if (mockData) {
      const transactions = JSON.parse(mockData);
      const updatedTransactions = transactions.filter(
        (transaction: Transaction) => transaction.id !== id,
      );
      localStorage.setItem("transactionMock", JSON.stringify(updatedTransactions));
    }
  };

  const showDeleteConfirm = (id: string) => {
    confirm({
      // title: `Esta seguro de eliminar el ${type === "income" ? "ingreso" : "gasto"}?`,
      icon: <ExclamationCircleFilled />,
      okText: "Si",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteTransaction(id);
      },
    });
  };

  const [editTransactionModal, setEditTransactionModal] = useState(false);

  const openEditTransactionModal = () => {
    setEditTransactionModal(true);
  };

  const closeEditTransactionModal = () => {
    setEditTransactionModal(false);
  };

  return (
    <>
      <Card className="expense_card">
        <List
          header={<ListHeader date={date} data={data} />}
          locale={{ emptyText: "No hay registros" }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Flex gap={16}>
                <Icon icon={item.icon} />
                <div className="expense_card_label">{item.label}</div>
              </Flex>
              <Flex gap={16}>
                <div>{item.description}</div>
                <div className="expense_card_amount">{formatCurrency(item.amount)}</div>
                <Button
                  size="small"
                  shape="circle"
                  icon={<EditOutlined />}
                  onClick={openEditTransactionModal}
                />
                <Button
                  size="small"
                  shape="circle"
                  icon={<DeleteFilled />}
                  onClick={() => showDeleteConfirm(item.id)}
                />
              </Flex>
            </List.Item>
          )}
        />
      </Card>
      <Modal open={editTransactionModal} onCancel={closeEditTransactionModal}>
        test
      </Modal>
    </>
  );
};

interface ListHeaderProps {
  date: string;
  data: Transaction[];
}

const ListHeader: React.FC<ListHeaderProps> = ({ date, data }) => {
  const incomeTotal = data.reduce((total, item) => {
    if (item.type === "income") {
      total += item.amount;
    }
    return total;
  }, 0);
  const expenseTotal = data.reduce((total, item) => {
    if (item.type === "expense") {
      total += item.amount;
    }
    return total;
  }, 0);

  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    return `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
  };

  return (
    <Flex justify="space-between" align="center">
      <span className="card_header_date">{formatDate(date)}</span>
      <Flex gap={16}>
        <span className="card_header_income">Ingresos: {formatCurrency(incomeTotal)}</span>
        <span className="card_header_expense">Gastos: {formatCurrency(expenseTotal)}</span>
      </Flex>
    </Flex>
  );
};

export default TransactionList;
