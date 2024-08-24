import { Button, Flex, Form, Modal } from "antd";
import { useEffect } from "react";
import dayjs from "dayjs";
import { useTransactionModal } from "../../../hooks";
import { TransactionForm } from "../transaction-form/TransactionForm.component";
import { Transaction } from "../../../../domain/entities";
import { AuthBasedTransactionService } from "../../../../data/services/AuthBasedTransactionService";
import { useAuth } from "reactfire";

const TransactionEdit: React.FC = () => {
  const { modals, selectedTransaction, closeModal } = useTransactionModal();
  const [form] = Form.useForm<Transaction>();
  const auth = useAuth();

  useEffect(() => {
    if (modals.isEditOpen && selectedTransaction) {
      const transactionWithDayjsDate = {
        ...selectedTransaction,
        date: dayjs(selectedTransaction.date),
        type: selectedTransaction.type,
      };
      form.setFieldsValue(transactionWithDayjsDate);
    }
  }, [modals.isEditOpen, selectedTransaction, form]);

  const handleCloseModal = () => {
    closeModal("isEditOpen");
  };

  const handleOnSubmit = async () => {
    const transactionService = new AuthBasedTransactionService(auth.currentUser);
    const currentId = form?.getFieldValue("id");

    await transactionService.updateTransaction(currentId, form.getFieldsValue());

    handleCloseModal();
  };

  const footer = (
    <Flex className="form_actions" gap={16}>
      <Button block onClick={handleCloseModal}>
        Cancelar
      </Button>
      <Button block type="primary" htmlType="submit" form="transactionForm">
        Guardar
      </Button>
    </Flex>
  );

  return (
    <Modal
      destroyOnClose
      title="Editar Transacción"
      open={modals.isEditOpen}
      onCancel={handleCloseModal}
      footer={footer}
      width={400}
    >
      <TransactionForm formInput={form} formOutput={handleOnSubmit} />
    </Modal>
  );
};

export default TransactionEdit;
