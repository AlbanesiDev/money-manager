import { Button, Flex, Modal } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Category } from "../../../../domain/entities";
import { useTransactionModal } from "../../../hooks";
import { defaultIconList } from "../../../utils";
import "../Transactions.css";
import typography from "antd/es/typography";

const { Title } = typography;

interface TransactionCategoriesProps {
  onSelectedCategory: (category: Category) => void;
}

const TransactionCategories: React.FC<TransactionCategoriesProps> = ({ onSelectedCategory }) => {
  const { modals, closeModal } = useTransactionModal();

  const handleSelectedCategory = (category: Category) => {
    onSelectedCategory(category);
    onClose();
  };

  const onClose = () => {
    closeModal("isCategoryOpen");
  };

  const footer = (
    <div>
      <Button style={{ marginRight: 8 }} onClick={onClose}>
        Cancelar
      </Button>
      <Button type="primary" onClick={onClose}>
        Crear
      </Button>
    </div>
  );

  return (
    <Modal
      centered
      className="transaction_categories"
      title="Categorias"
      open={modals.isCategoryOpen}
      onCancel={onClose}
      footer={footer}
    >
      <Flex vertical gap={24} className="category_container">
        {defaultIconList.map((category) => (
          <Flex vertical wrap gap={8} key={category.title}>
            <Title level={5}>{category.title}</Title>
            <Flex wrap gap={8}>
              {category.icons.map((icon, index) => (
                <Flex gap={8} align="center" key={index}>
                  <Button size="large" onClick={() => handleSelectedCategory(icon)}>
                    <FontAwesomeIcon icon={icon.icon} />
                    <span>{icon.label}</span>
                  </Button>
                </Flex>
              ))}
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Modal>
  );
};

export default TransactionCategories;
