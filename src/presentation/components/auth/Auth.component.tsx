import React, { useContext } from "react";
import { Modal } from "antd";
import ForgotPassword from "./auth-forms/ForgotPassword";
import { AuthContext } from "../../contexts/AuthContext";
import SignUp from "./auth-forms/SignUp.component";
import SignIn from "./auth-forms/SignIn.component";

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

export { AuthModal };
