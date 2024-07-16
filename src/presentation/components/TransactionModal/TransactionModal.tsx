import { Button, DatePicker, InputNumber, Modal, Form, FormInstance } from "antd";
import "./TransactionModal.css";
import { useState, useEffect } from "react";
import TextArea from "antd/es/input/TextArea";
import { Transaction } from "../../../domain/entities/Transaction";
import TransactionCategories from "../TransactionCategories/TransactionCategories";
import { Category } from "../../../models/tracker.interface";
import { v4 as uuidv4 } from "uuid";

interface TransactionModalProps extends TransactionCloseProp {
  transaction: Transaction;
  type: "add" | "edit";
  onOpen: boolean;
}

interface TransactionCloseProp {
  onClose: () => void;
}

interface FormData {
  type: string;
  category: string;
  date: Date;
  amount: number;
  description?: string;
}

const TransactionModal: React.FC<TransactionModalProps> = ({ onOpen, onClose }) => {
  const [categoryModal, setCategoryModal] = useState(false);
  const [category, setCategory] = useState<Category | null>(null);
  const [form] = Form.useForm<FormData>();

  const handleOpenSelectCategoryModal = () => {
    setCategoryModal(true);
  };

  const handleCloseSelectCategoryModal = () => {
    setCategoryModal(false);
  };

  const onSelectedCategory = (category: Category) => {
    setCategory(category);
    form.setFieldsValue({ category: category.name });
  };

  return (
    <>
      <Modal title="Agregar transacción" open={onOpen} onCancel={onClose} footer={null} width={400}>
        <TransactionForm
          onClose={onClose}
          onOpenSelectCategoryModal={handleOpenSelectCategoryModal}
          selectedCategory={category}
          form={form}
        />
      </Modal>
      <TransactionCategories
        onOpen={categoryModal}
        onClose={handleCloseSelectCategoryModal}
        onSelectCategory={onSelectedCategory}
      />
    </>
  );
};

interface TransactionFormProps extends TransactionCloseProp {
  onOpenSelectCategoryModal: () => void;
  selectedCategory: Category | null;
  form: FormInstance<FormData>;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  onClose,
  onOpenSelectCategoryModal,
  selectedCategory,
  form,
}) => {
  const [selectedType, setSelectedType] = useState("expense");

  useEffect(() => {
    form.setFieldsValue({ category: selectedCategory?.name });
  }, [selectedCategory, form]);

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    form.setFieldsValue({ type: value });
  };

  const onFinish = (data: FormData) => {
    const transactionId = uuidv4();
    const newData = {
      ...data,
      id: transactionId,
      label: selectedCategory?.name,
      icon: selectedCategory?.icon,
    };

    let transactions: FormData[] = [];

    const mockData = localStorage.getItem("transactionMock");

    if (mockData) {
      try {
        transactions = JSON.parse(mockData);
        if (!Array.isArray(transactions)) {
          transactions = [];
        }
      } catch (e) {
        console.error("Error parsing localStorage data", e);
        transactions = [];
      }
    }

    transactions.push(newData);
    localStorage.setItem("transactionMock", JSON.stringify(transactions));

    onClose();
    form.resetFields();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      className="transaction_form"
      onFinish={onFinish}
      initialValues={{ type: selectedType }}
    >
      <Form.Item label="Tipo de transacción" name="type">
        <div style={{ display: "flex", gap: "16px" }}>
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
        </div>
      </Form.Item>
      <Form.Item
        label="Categoría"
        name="category"
        rules={[{ required: true, message: "Por favor, selecciona una categoría" }]}
      >
        <Button block onClick={onOpenSelectCategoryModal}>
          {selectedCategory?.name || "Seleccionar categoría"}
        </Button>
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
        <TextArea placeholder="Ingresa una descripción" maxLength={200} autoSize />
      </Form.Item>
      <div style={{ display: "flex", gap: "16px" }}>
        <Button block onClick={onClose}>
          Cancelar
        </Button>
        <Button block type="primary" htmlType="submit">
          Confirmar
        </Button>
      </div>
    </Form>
  );
};

export default TransactionModal;
