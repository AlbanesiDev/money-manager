import { Flex, Modal, Typography } from "antd";
import { useTransactionModal } from "../../../hooks";
import { formatCurrency, formatDate, formatTime } from "../../../utils";
import dayjs from "dayjs";
import "../Transactions.css";

const { Text } = Typography;

const TransactionDetail: React.FC = () => {
  const { modals, selectedTransaction, closeModal } = useTransactionModal();
  const transactionDate = dayjs(selectedTransaction.date);

  return (
    <Modal
      title="Detalles de la transacción"
      open={modals.isDetailOpen}
      onCancel={() => closeModal("isDetailOpen")}
      footer={null}
      width={400}
    >
      <Flex className="transaction_detail" vertical gap={4}>
        <div>
          <Text>Categoría: </Text>
          <Text strong type="secondary">
            {selectedTransaction.category?.label}
          </Text>
        </div>
        {selectedTransaction.description && (
          <div>
            <Text>Descripción: </Text>
            <Text strong type="secondary">
              {selectedTransaction.description}
            </Text>
          </div>
        )}
        <div>
          <Text>Monto: </Text>
          <Text strong type="secondary">
            {formatCurrency(selectedTransaction.amount)}
          </Text>
        </div>
        <div>
          <Text>Fecha y hora: </Text>
          <Text strong type="secondary">
            {formatDate(transactionDate)} - {formatTime(transactionDate)}
          </Text>
        </div>
      </Flex>
    </Modal>
  );
};

export default TransactionDetail;
