import { DownloadOutlined } from "@ant-design/icons";
import { Button, Flex, Modal } from "antd";
import { signOut } from "firebase/auth";
import { useAuth } from "reactfire";
import "./Profile.css";
import { useProfile } from "../../hooks";

const ProfileModal: React.FC = () => {
  const auth = useAuth();
  const { isModalOpen, closeModal } = useProfile();

  const handleSignOut = async () => {
    await signOut(auth);
    closeModal();
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
        <h2>Perfil</h2>
        <Flex vertical gap={8} className="profile_info">
          <span className="profile_name">Nombre: {auth.currentUser?.displayName}</span>
          <span className="profile_email">Correo electrónico: {auth.currentUser?.email}</span>
        </Flex>
        <Button icon={<DownloadOutlined />}>Descargar registros</Button>
        <Button block danger onClick={handleSignOut}>
          Cerrar Sesión
        </Button>
      </Flex>
    </Modal>
  );
};

export { ProfileModal };
