import { Button, Card, List, Typography } from "antd";
import { DeleteFilled, EditOutlined } from "@ant-design/icons";
import { Transaction } from "../../../../domain/entities";
import { useTransactionModal } from "../../../hooks";
import { formatCurrency, formatDate } from "../../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TransactionDelete from "../transaction-modal/TransactionDelete.component";
import TransactionDetail from "../transaction-modal/TransactionDetail.component";
import TransactionEdit from "../transaction-modal/TransactionEdit.component";
import "../Transactions.css";

const { Paragraph } = Typography;

interface PropType {
  data: Transaction[];
  date: string;
}

const TransactionList: React.FC<PropType> = ({ data, date }) => {
  const { openDetailModal, openEditModal, openDeleteModal } = useTransactionModal();
  const ellipsis = true;

  return (
    <>
      <Card className="expense_card">
        <List
          header={<ListHeader date={date} data={data} />}
          locale={{ emptyText: "No hay registros" }}
          dataSource={data}
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

      <TransactionEdit />
      <TransactionDelete />
      <TransactionDetail />
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

  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span className="card_header_date">{formatDate(date)}</span>
      <div style={{ display: "flex", gap: "16px" }}>
        <span className="card_header_income">Ingresos: {formatCurrency(incomeTotal)}</span>
        <span className="card_header_expense">Gastos: {formatCurrency(expenseTotal)}</span>
      </div>
    </div>
  );
};

export { TransactionList };
