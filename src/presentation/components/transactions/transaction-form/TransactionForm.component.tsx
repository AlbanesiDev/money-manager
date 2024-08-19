import { useEffect, useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, DatePicker, InputNumber, Form, FormInstance, Flex } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useAuth } from "reactfire";
import dayjs from "dayjs";

import { AuthBasedTransactionService } from "../../../../data/services/AuthBasedTransactionService";
import { useTransactionModal } from "../../../hooks";
import { Transaction } from "../../../../domain/entities";

import TransactionCategories from "./TransactionCategories.component";
import "../Transactions.css";

interface TransactionFormProps {
  isEdit: boolean;
  form: FormInstance<Transaction> | undefined;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ form, isEdit }) => {
  const [selectedType, setSelectedType] = useState<"income" | "expense">("expense");
  const { openCategoryModal, closeModal, selectedTransaction, selectedCategory } =
    useTransactionModal();
  const auth = useAuth();

  const handleCloseModal = () => {
    isEdit ? closeModal("isEditOpen") : closeModal("isAddOpen");
  };

  useEffect(() => {
    form?.setFieldsValue({ type: selectedType });
    if (form && form.getFieldValue("date")) {
      const dateValue = dayjs(form.getFieldValue("date"));
      form.setFieldsValue({ date: dateValue });
    }
  }, [selectedType, form]);

  const handleTypeChange = (value: "income" | "expense") => {
    setSelectedType(value);
  };

  const handleOpenCategoriesModal = () => {
    openCategoryModal();
  };

  const clearCategory = () => {
    selectedCategory(undefined);
  };

  const onFinish = async (formData: Transaction) => {
    const transactionService = new AuthBasedTransactionService(auth.currentUser);
    const currentId = form?.getFieldValue("id");

    const category = selectedTransaction.category;

    if (!category) {
      return;
    }

    const transactionData: Transaction = {
      ...formData,
      type: selectedType,
      date: formData.date,
    };

    if (isEdit) {
      await transactionService.updateTransaction(currentId, transactionData, category);
      handleCloseModal();
    } else {
      await transactionService.addTransaction(transactionData, category);
      handleCloseModal();
    }
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        className="transaction_form"
        onFinish={(formData) => onFinish(formData)}
      >
        <Form.Item label="Tipo de transacción" name="type">
          <Flex gap={16}>
            <Button
              block
              type={selectedType === "income" ? "primary" : "default"}
              onClick={() => handleTypeChange("income")}
            >
              Ingreso
            </Button>
            <Button
              block
              type={selectedType === "expense" ? "primary" : "default"}
              onClick={() => handleTypeChange("expense")}
            >
              Gasto
            </Button>
          </Flex>
        </Form.Item>
        <Form.Item
          label="Categoría"
          name={["category", "name"]}
          rules={[{ required: false, message: "Por favor, selecciona una categoría" }]}
        >
          <Flex gap={8}>
            <Button block onClick={handleOpenCategoriesModal}>
              {selectedTransaction.category?.label ? (
                <Flex gap={8} align="center">
                  <FontAwesomeIcon icon={selectedTransaction.category.icon} />{" "}
                  {selectedTransaction.category.label}
                </Flex>
              ) : (
                "Seleccionar categoría"
              )}
            </Button>
            {selectedTransaction.category?.label ? (
              <Button type="text" icon={<CloseOutlined />} onClick={clearCategory} />
            ) : null}
          </Flex>
        </Form.Item>
        <Form.Item
          label="Fecha"
          name="date"
          rules={[{ required: true, message: "Por favor, selecciona una fecha" }]}
        >
          <DatePicker
            showTime
            className="date_picker"
            format="DD/MM/YYYY HH:mm"
            placeholder="Seleccionar fecha"
          />
        </Form.Item>
        <Form.Item
          label="Monto"
          name="amount"
          rules={[{ required: true, message: "Por favor, ingresa el monto" }]}
        >
          <InputNumber
            className="amount_input"
            prefix="$"
            placeholder="Ingresa el monto"
            type="number"
          />
        </Form.Item>
        <Form.Item
          label="Descripción (opcional)"
          name="description"
          rules={[{ max: 200, message: "La descripción no puede superar los 200 caracteres" }]}
        >
          <TextArea
            placeholder="Ingresa una descripción"
            maxLength={200}
            autoSize={{ minRows: 2, maxRows: 6 }}
          />
        </Form.Item>
        <Flex gap={16}>
          <Button block onClick={handleCloseModal}>
            Cancelar
          </Button>
          {/* Botón de guardar o actualizar */}
          <Button block type="primary" htmlType="submit">
            {isEdit ? "Guardar" : "Agregar"}
          </Button>
        </Flex>
      </Form>
      <TransactionCategories />
    </>
  );
};

export { TransactionForm };
