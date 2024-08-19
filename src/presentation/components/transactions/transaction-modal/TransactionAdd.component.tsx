import { Modal } from "antd";
import { useTransactionModal } from "../../../hooks";
import { TransactionForm } from "../transaction-form/TransactionForm.component";

const TransactionAdd: React.FC = () => {
  const { modals, closeModal } = useTransactionModal();

  const handleCloseModal = () => {
    closeModal("isAddOpen");
  };

  return (
    <Modal
      title="Añadir Transacción"
      open={modals.isAddOpen}
      onCancel={handleCloseModal}
      footer={null}
      width={400}
    >
      <TransactionForm isEdit={false} form={undefined} />
    </Modal>
  );
};

export { TransactionAdd };
