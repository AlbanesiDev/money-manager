import { DownloadOutlined } from "@ant-design/icons";
import { Button, Flex, Modal, Typography } from "antd";
import { signOut } from "firebase/auth";
import { useAuth } from "reactfire";
import "./Profile.css";
import { useProfile } from "../../hooks";
import { downloadCSV } from "../../utils/downloadCSV";

const { Text, Paragraph } = Typography;

const ProfileModal: React.FC = () => {
  const auth = useAuth();
  const { isModalOpen, closeModal } = useProfile();

  const handleSignOut = async () => {
    await signOut(auth);
    closeModal();
  };

  const handleDownload = () => {
    downloadCSV();
  };

  return (
    <Modal
      centered
      title="Perfil"
      open={isModalOpen}
      onCancel={closeModal}
      width={400}
      footer={null}
    >
      <Flex vertical gap={16}>
        <Flex vertical gap={8} className="profile_info">
          <Paragraph>
            <Text strong>Nombre: </Text>
            <Text type="secondary">{auth.currentUser?.displayName}</Text>
          </Paragraph>

          <Paragraph>
            <Text strong>Correo electrónico: </Text>
            <Text type="secondary">{auth.currentUser?.email}</Text>
          </Paragraph>
        </Flex>
        <Button block icon={<DownloadOutlined />} onClick={handleDownload}>
          Descargar registros
        </Button>
        <Button block danger onClick={handleSignOut}>
          Cerrar Sesión
        </Button>
      </Flex>
    </Modal>
  );
};

export { ProfileModal };
