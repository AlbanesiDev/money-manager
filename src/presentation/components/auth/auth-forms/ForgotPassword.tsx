import { Button, Flex, Form, Input, Result, Typography } from "antd";
import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { useAuth } from "reactfire";

interface ForgotPasswordProps {
  switchToSignIn: () => void;
}

type Step = "initial" | "success" | "error";

const { Text } = Typography;

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ switchToSignIn }) => {
  const [step, setStep] = useState<Step>("initial");
  const auth = useAuth();

  const handleOnFinish = async (values: { email: string }) => {
    const { email } = values;
    try {
      await sendPasswordResetEmail(auth, email);
      setStep("success");
    } catch (error) {
      setStep("error");
    }
  };

  return (
    <>
      {step === "initial" && (
        <Form layout="vertical" autoComplete="on" onFinish={handleOnFinish}>
          <Flex vertical gap={24}>
            <Text type="secondary">
              Introduce tu correo electronico para restablecer tu contraseña
            </Text>
            <Form.Item
              label="Correo electronico"
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
              <Input></Input>
            </Form.Item>
            <Form.Item>
              <Flex gap={16}>
                <Button block onClick={switchToSignIn}>
                  Volver
                </Button>
                <Button block type="primary" htmlType="submit">
                  Enviar email
                </Button>
              </Flex>
            </Form.Item>
          </Flex>
        </Form>
      )}
      {step === "success" && (
        <Result
          status="success"
          title="Email enviado correctamente"
          subTitle="Revisa tu correo electronico"
          extra={[
            <Button key="back" block onClick={switchToSignIn}>
              Volver
            </Button>,
          ]}
        />
      )}
      {step === "error" && (
        <Result
          status="error"
          title="El email no se pudo enviar"
          extra={[
            <Button key="back" block onClick={() => setStep("initial")}>
              Volver
            </Button>,
          ]}
        />
      )}
    </>
  );
};

export default ForgotPassword;
