import { Button, Divider, Flex, Input, Modal } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Category } from "../../../../domain/entities";
import { useTransactionModal } from "../../../hooks";
import { defaultIconList } from "../../../utils";
import "../Transactions.css";

const TransactionCategories: React.FC = () => {
  // const [customCategory, setCustomCategory] = useState<
  //   { title: string; icons: Transaction["category"] }[]
  // >([]);
  const [openCustomCategory, setOpenCreateCustomCategory] = useState(false);
  const { modals, closeCategoryModal, selectedCategory } = useTransactionModal();

  // const createCustomCategory = () => {
  //   setCustomCategory([{ title: "Personalizada", icons: undefined }]);
  // };

  const openCreateCustomCategory = () => {
    setOpenCreateCustomCategory(true);
  };

  const onSelectedCategory = (category: Category | undefined = undefined) => {
    console.log(category);
    selectedCategory(category);
    onClose();
  };

  const onClose = () => {
    closeCategoryModal();
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
      footer={openCustomCategory ? footer : null}
    >
      {openCustomCategory ? (
        <CreateNewCategory />
      ) : (
        <DefaultCategories
          openCreateCustomCategory={openCreateCustomCategory}
          onClose={onClose}
          onSelectCategory={onSelectedCategory}
        />
      )}
    </Modal>
  );
};

interface CreateNewCategoryProps {
  openCreateCustomCategory: () => void;
  onSelectCategory: (category: Category | undefined) => void;
  onClose: () => void;
}

const DefaultCategories: React.FC<CreateNewCategoryProps> = ({
  openCreateCustomCategory,
  onSelectCategory,
}) => {
  const selectedCategory = (category: Category | undefined) => {
    onSelectCategory(category);
  };

  return (
    <Flex vertical className="category_list">
      <div className="category_header">
        <h2 className="category_title">Categorias personalizadas</h2>

        <Button type="primary" onClick={openCreateCustomCategory}>
          <PlusOutlined />
          <span>Añadir categoria</span>
        </Button>
      </div>

      <Divider />

      <Flex vertical gap={24} className="category_container">
        {defaultIconList.map((category) => (
          <Flex vertical wrap gap={8} key={category.title}>
            <h2 className="category_title">{category.title}</h2>
            <Flex wrap gap={8}>
              {category.icons.map((icon, index) => (
                <Flex gap={8} align="center" key={index}>
                  <Button size="large" onClick={() => selectedCategory(icon)}>
                    <FontAwesomeIcon icon={icon.icon} />
                    <span>{icon.label}</span>
                  </Button>
                </Flex>
              ))}
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

const CreateNewCategory: React.FC = () => {
  return (
    <>
      <h2 className="category_title">Crear una nueva categoria</h2>
      <Flex gap={8}>
        <Input></Input>
        <Input></Input>
      </Flex>
    </>
  );
};

export default TransactionCategories;
