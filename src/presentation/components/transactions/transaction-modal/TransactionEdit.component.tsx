import { Form, Modal } from "antd";
import { useEffect } from "react";
import dayjs from "dayjs";
import { useTransactionModal } from "../../../hooks";
import { TransactionForm } from "../transaction-form/TransactionForm.component";
import { Transaction } from "../../../../domain/entities";

const TransactionEdit: React.FC = () => {
  const { modals, closeModal, selectedTransaction } = useTransactionModal();

  const [form] = Form.useForm<Transaction>();

  useEffect(() => {
    if (modals.isEditOpen && selectedTransaction) {
      const transactionWithDayjsDate = {
        ...selectedTransaction,
        date: dayjs(selectedTransaction.date),
      };
      form.setFieldsValue(transactionWithDayjsDate);
    }
  }, [modals.isEditOpen, selectedTransaction, form]);

  return (
    <Modal
      title="Editar Transacción"
      open={modals.isEditOpen}
      onCancel={() => closeModal("isEditOpen")}
      footer={null}
      width={400}
    >
      <TransactionForm isEdit form={form} />
    </Modal>
  );
};

export default TransactionEdit;
