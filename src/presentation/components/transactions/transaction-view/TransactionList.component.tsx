import { lazy, Suspense } from "react";
import { Button, Card, List, Typography } from "antd";
import { DeleteFilled, EditOutlined } from "@ant-design/icons";
import { Transaction } from "../../../../domain/entities";
import { useTransactionModal } from "../../../hooks";
import { formatCurrency, formatDate } from "../../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../Transactions.css";
import dayjs, { Dayjs } from "dayjs";

interface PropType {
  groupedTransactions: Record<string, Transaction[]>;
}

const TransactionDelete = lazy(() => import("../transaction-modal/TransactionDelete.component"));
const TransactionDetail = lazy(() => import("../transaction-modal/TransactionDetail.component"));
const TransactionEdit = lazy(() => import("../transaction-modal/TransactionEdit.component"));

const { Paragraph, Text } = Typography;

const TransactionList: React.FC<PropType> = ({ groupedTransactions }) => {
  const { openDetailModal, openEditModal, openDeleteModal } = useTransactionModal();
  const ellipsis = true;

  return (
    <>
      {Object.keys(groupedTransactions).map((data) => (
        <Card key={data} className="expense_card">
          <List
            header={<ListHeader date={dayjs(data)} data={groupedTransactions[data]} />}
            locale={{ emptyText: "No hay registros" }}
            dataSource={groupedTransactions[data]}
            renderItem={(item) => (
              <List.Item
                key={item.id}
                actions={[
                  <Button
                    size="small"
                    shape="circle"
                    icon={<EditOutlined />}
                    onClick={() => openEditModal(item)}
                  />,
                  <Button
                    size="small"
                    shape="circle"
                    icon={<DeleteFilled />}
                    onClick={() => openDeleteModal(item.id)}
                  />,
                ]}
              >
                <List.Item.Meta
                  avatar={<FontAwesomeIcon icon={item.category!.icon} />}
                  title={item.category!.label}
                  description={
                    <Paragraph
                      type="secondary"
                      ellipsis={ellipsis ? { rows: 1, expandable: true, symbol: "" } : false}
                      onClick={() => openDetailModal(item)}
                    >
                      {item.description}
                    </Paragraph>
                  }
                ></List.Item.Meta>
                <div className="expense_card_amount">{formatCurrency(item.amount)}</div>
              </List.Item>
            )}
          />
        </Card>
      ))}
      <Suspense fallback={null}>
        <TransactionEdit />
        <TransactionDelete />
        <TransactionDetail />
      </Suspense>
    </>
  );
};

interface ListHeaderProps {
  date: Dayjs;
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

  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span className="card_header_date">{formatDate(date)}</span>
      <div style={{ display: "flex", gap: "16px" }}>
        <Text type="success">Ingresos: {formatCurrency(incomeTotal)}</Text>
        <Text type="danger">Gastos: {formatCurrency(expenseTotal)}</Text>
      </div>
    </div>
  );
};

export { TransactionList };
