import React, { useContext } from "react";
import { Modal } from "antd";
import SignIn from "../SignIn/SignIn";
import SignUp from "../signUp/SignUp";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import { AuthContext } from "../../contexts/AuthContext";

const AuthModal: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthModal must be used within an AuthProvider");
  }

  const {
    isModalOpen,
    modalContent,
    titleModal,
    closeModal,
    openSignUpModal,
    openForgotPasswordModal,
    openSignInModal,
  } = authContext;

  return (
    <Modal
      centered
      title={titleModal}
      open={isModalOpen}
      onCancel={closeModal}
      width={400}
      footer={null}
    >
      {modalContent === "signIn" && (
        <SignIn
          onClose={closeModal}
          switchToSignUp={openSignUpModal}
          switchToForgotPassword={openForgotPasswordModal}
        />
      )}
      {modalContent === "signUp" && (
        <SignUp onClose={closeModal} switchToSignIn={openSignInModal} />
      )}
      {modalContent === "forgotPassword" && (
        <ForgotPassword onClose={closeModal} switchToSignIn={openSignInModal} />
      )}
    </Modal>
  );
};

export default AuthModal;
