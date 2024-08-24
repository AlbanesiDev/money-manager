import { Button, Flex, Form, Modal } from "antd";
import { useTransactionModal } from "../../../hooks";
import { TransactionForm } from "../transaction-form/TransactionForm.component";
import { AuthBasedTransactionService } from "../../../../data/services/AuthBasedTransactionService";
import { useAuth } from "reactfire";
import { useEffect } from "react";

const TransactionAdd: React.FC = () => {
  const { modals, closeModal } = useTransactionModal();
  const [form] = Form.useForm();
  const auth = useAuth();

  const handleCloseModal = () => {
    form.resetFields();
    closeModal("isAddOpen");
  };

  const handleOnSubmit = async () => {
    const transactionService = new AuthBasedTransactionService(auth.currentUser);
    await transactionService.addTransaction(form.getFieldsValue());
    handleCloseModal();
  };

  useEffect(() => {
    if (modals.isAddOpen) {
      form.setFieldsValue({ type: "expense" });
    }
  }, [form, modals.isAddOpen]);

  const footer = (
    <Flex className="form_actions" gap={16}>
      <Button block onClick={handleCloseModal}>
        Cancelar
      </Button>
      <Button block type="primary" htmlType="submit" form="transactionForm">
        Agregar
      </Button>
    </Flex>
  );

  return (
    <Modal
      destroyOnClose
      title="Añadir Transacción"
      open={modals.isAddOpen}
      onCancel={handleCloseModal}
      footer={footer}
      width={400}
    >
      <TransactionForm formInput={form} formOutput={handleOnSubmit} />
    </Modal>
  );
};

export default TransactionAdd;
