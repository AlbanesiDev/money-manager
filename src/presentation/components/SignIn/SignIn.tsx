import React, { useState } from "react";
import { Input, Button, Form, Divider, Flex } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useAuth } from "reactfire";
import { createUserDoc } from "../../utils/createUserDoc";
import "./SignIn.css";

interface SignInProps {
  onClose: () => void;
  switchToForgotPassword: () => void;
  switchToSignUp: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onClose, switchToForgotPassword, switchToSignUp }) => {
  const auth = useAuth();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleEmailLogin = async (values: { email: string; password: string }) => {
    const { email, password } = values;
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        onClose();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
        if (errorCode === "auth/too-many-requests") {
          setIsButtonDisabled(true);
        }
      });
  };

  async function handleGoogleLogin() {
    const provider = new GoogleAuthProvider();
    const user = await signInWithPopup(auth, provider).then((userCredential) => {
      return userCredential.user;
    });
    createUserDoc(user.uid);
    onClose();
  }

  return (
    <Flex vertical gap={16} className="sign_in">
      <Form name="normal_login" autoComplete="on" onFinish={handleEmailLogin}>
        <Flex vertical gap={8} className="sign_in_form">
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Por favor ingrese su correo electrónico.",
              },
              {
                type: "email",
                message: "Por favor ingrese un correo electrónico válido.",
              },
            ]}
          >
            <Input type="email" placeholder="Correo electrónico" autoComplete="email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Por favor ingrese su contraseña.",
              },
            ]}
          >
            <Input.Password
              type="password"
              placeholder="Contraseña"
              autoComplete="current-password"
            />
          </Form.Item>
        </Flex>

        <Flex vertical gap={16}>
          <Button type="link" className="sign_in_forgot" onClick={switchToForgotPassword}>
            Recuperar contraseña
          </Button>

          <Button
            block
            type="primary"
            htmlType="submit"
            className="login-form-button"
            disabled={isButtonDisabled}
          >
            Iniciar Sesión
          </Button>
        </Flex>

        <Divider />
        <Flex vertical gap={24}>
          <Button block icon={<GoogleOutlined />} onClick={handleGoogleLogin}>
            Google
          </Button>

          <Flex justify="center" align="center">
            ¿Aún no tienes una cuenta?
            <Button type="link" onClick={switchToSignUp}>
              Crear cuenta
            </Button>
          </Flex>
        </Flex>
      </Form>
    </Flex>
  );
};

export default SignIn;
