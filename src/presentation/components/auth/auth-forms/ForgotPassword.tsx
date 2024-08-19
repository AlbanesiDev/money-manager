import React from "react";

interface ForgotPasswordProps {
  onClose: () => void;
  switchToSignIn: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
  return <div>ForgotPassword</div>;
};

export default ForgotPassword;
