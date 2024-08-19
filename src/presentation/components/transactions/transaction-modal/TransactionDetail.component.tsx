import { Modal } from "antd";
import { useTransactionModal } from "../../../hooks";
import { formatCurrency } from "../../../utils";

const TransactionDetail: React.FC = () => {
  const { modals, selectedTransaction, closeModal } = useTransactionModal();

  return (
    <Modal
      title="Detalles de la transacción"
      open={modals.isDetailOpen}
      onCancel={() => closeModal("isDetailOpen")}
      footer={null}
      width={400}
    >
      {/* <p>{selectedTransaction.category.name}</p> */}
      {selectedTransaction.description && <p>Descripción: {selectedTransaction.description}</p>}
      <p>Monto: {formatCurrency(selectedTransaction.amount)}</p>
      {/* <p>Fecha: {formatDate(selectedTransaction.date)}</p>
      <p>Hora: {formatTime(selectedTransaction.date)}</p> */}
    </Modal>
  );
};

export default TransactionDetail;
