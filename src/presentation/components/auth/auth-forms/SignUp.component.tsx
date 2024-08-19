import { GoogleOutlined } from "@ant-design/icons";
import { Input, Button, Form, Divider, Flex } from "antd";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import React from "react";
import { useAuth } from "reactfire";
import { createUserDoc } from "../../../utils/createUserDoc";
import "../auth.css";

interface SignUpProps {
  onClose: () => void;
  switchToSignIn: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onClose, switchToSignIn }) => {
  const auth = useAuth();

  async function handleEmailRegister(values: {
    username: string;
    email: string;
    password: string;
  }) {
    const { username, email, password } = values;
    const user = await createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        return userCredential.user;
      },
    );
    await updateProfile(user, { displayName: username });
    createUserDoc(user.uid);
    onClose();
  }

  async function handleGoogleLogin() {
    const provider = new GoogleAuthProvider();
    const user = await signInWithPopup(auth, provider).then((userCredential) => {
      return userCredential.user;
    });

    createUserDoc(user.uid);

    onClose();
  }

  return (
    <Flex vertical gap={16} className="sign_up">
      <Form name="normal_login" onFinish={handleEmailRegister}>
        <Flex vertical gap={8} className="sign_up_form">
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Por favor ingrese un nombre.",
              },
              { min: 3, message: "El nombre debe tener al menos 3 caracteres." },
              { max: 20, message: "El nombre debe tener menos de 20 caracteres." },
              { pattern: /^[a-zA-Z\s]*$/, message: "El nombre solo puede contener letras." },
            ]}
          >
            <Input autoFocus type="text" placeholder="Nombre" autoComplete="off" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Por favor ingrese un correo electrónico.",
              },
              {
                type: "email",
                message: "Por favor ingrese un correo electrónico valido.",
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
                message: "Por favor ingrese una contraseña.",
              },
              { min: 8, message: "La contraseña debe tener al menos 8 caracteres." },
              {
                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/,
                message:
                  "La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número.",
              },
            ]}
          >
            <Input.Password type="password" placeholder="Contraseña" autoComplete="new-password" />
          </Form.Item>
        </Flex>

        <Flex vertical gap={16}>
          <Button block type="primary" htmlType="submit" className="login-form-button">
            Registrarse
          </Button>
        </Flex>

        <Divider />

        <Flex vertical gap={24}>
          <Button block icon={<GoogleOutlined />} onClick={handleGoogleLogin}>
            Google
          </Button>

          <Flex justify="center" align="center">
            ¿Ya tienes una cuenta?
            <Button type="link" onClick={switchToSignIn}>
              Iniciar Sesión
            </Button>
          </Flex>
        </Flex>
      </Form>
    </Flex>
  );
};

export default SignUp;
