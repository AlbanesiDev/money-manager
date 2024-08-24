import { lazy, Suspense, useEffect, useState } from "react";
import { Button, DatePicker, InputNumber, Form, Flex, FormInstance } from "antd";
import TextArea from "antd/es/input/TextArea";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CloseOutlined } from "@ant-design/icons";

import { Category, Transaction } from "../../../../domain/entities";
import { useTransactionModal } from "../../../hooks";

import "../Transactions.css";

interface TransactionFormProps {
  formInput: FormInstance<Transaction>;
  formOutput: (formData: Transaction) => void;
}

type TransactionFormType = "income" | "expense";

const TransactionCategories = lazy(() => import("./TransactionCategories.component"));

const TransactionForm: React.FC<TransactionFormProps> = ({ formInput, formOutput }) => {
  const [selectedType, setSelectedType] = useState<TransactionFormType>("expense");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>();
  const [isCategoryInvalid, setIsCategoryInvalid] = useState(false);

  const { openCategoryModal } = useTransactionModal();

  const validationRules = {
    category: [
      {
        validator() {
          if (selectedCategory) {
            setIsCategoryInvalid(false);
            return Promise.resolve();
          } else {
            setIsCategoryInvalid(true);
            return Promise.reject(new Error("Por favor, selecciona una categoría"));
          }
        },
      },
    ],
    date: [{ required: true, message: "Por favor, selecciona una fecha" }],
    amount: [{ required: true, message: "Por favor, ingresa el monto" }],
    description: [{ max: 200, message: "La descripción no puede superar los 200 caracteres" }],
  };

  const handleTypeChange = (type: TransactionFormType) => {
    setSelectedType(type);
    formInput.setFieldsValue({ type: type });
  };

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setIsCategoryInvalid(false);
    formInput.setFieldsValue({ category: category });
  };

  useEffect(() => {
    if (formInput) {
      const { type, category } = formInput.getFieldsValue();
      setSelectedType(type);
      setSelectedCategory(category);
    }
  }, [formInput]);

  return (
    <>
      <Form id="transactionForm" layout="vertical" form={formInput} onFinish={formOutput}>
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

        <Form.Item label="Categoría" name="category" rules={validationRules.category}>
          <Flex gap={8}>
            <Button block danger={isCategoryInvalid} onClick={openCategoryModal}>
              {selectedCategory?.label ? (
                <Flex gap={8} align="center">
                  <FontAwesomeIcon icon={selectedCategory.icon} /> {selectedCategory.label}
                </Flex>
              ) : (
                "Seleccionar categoría"
              )}
            </Button>
            {selectedCategory?.label ? (
              <Button
                type="text"
                icon={<CloseOutlined />}
                onClick={() => setSelectedCategory(null)}
              />
            ) : null}
          </Flex>
        </Form.Item>

        <Form.Item label="Fecha" name="date" rules={validationRules.date}>
          <DatePicker
            showTime
            className="date_picker"
            format="DD/MM/YYYY HH:mm"
            placeholder="Seleccionar fecha"
          />
        </Form.Item>

        <Form.Item label="Monto" name="amount" rules={validationRules.amount}>
          <InputNumber
            className="amount_input"
            prefix="$"
            placeholder="Ingresa el monto"
            type="number"
            max={9999999999}
            min={1}
          />
        </Form.Item>

        <Form.Item
          label="Descripción (opcional)"
          name="description"
          rules={validationRules.description}
        >
          <TextArea
            placeholder="Ingresa una descripción"
            maxLength={200}
            autoSize={{ minRows: 2, maxRows: 6 }}
          />
        </Form.Item>
      </Form>

      <Suspense>
        <TransactionCategories onSelectedCategory={handleCategorySelect} />
      </Suspense>
    </>
  );
};

export { TransactionForm };
