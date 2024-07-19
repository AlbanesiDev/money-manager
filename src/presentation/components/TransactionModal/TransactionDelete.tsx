import { Button, Flex, Modal } from "antd";
import { useTransactionModal } from "../../hooks";
import { WarningOutlined } from "@ant-design/icons";
import { useAuthBasedTransactionService } from "../../../factories/useAuthBasedTransactionService ";

const TransactionDelete: React.FC = () => {
  const { modals, closeModal, deleteId } = useTransactionModal();
  const transactionService = useAuthBasedTransactionService();

  const handleCloseModal = () => {
    closeModal("isDeleteOpen");
  };

  const deleteTransaction = async () => {
    await transactionService.deleteTransaction(deleteId);
    closeModal("isDeleteOpen");
  };

  return (
    <Modal
      title="Eliminar Transacción"
      open={modals.isDeleteOpen}
      onCancel={handleCloseModal}
      footer={null}
      width={400}
    >
      <Flex justify="center">
        <WarningOutlined style={{ fontSize: "3rem" }} />
      </Flex>
      <p>¿Estas seguro de eliminar esta transacción?</p>
      <Flex className="delete_modal_buttons" gap={16}>
        <Button block onClick={handleCloseModal}>
          Cancelar
        </Button>
        <Button block danger type="primary" onClick={deleteTransaction}>
          Eliminar
        </Button>
      </Flex>
    </Modal>
  );
};

export { TransactionDelete };
