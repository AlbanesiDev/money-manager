import { Button, Flex, Typography } from "antd";
import "./Footer.css";

const Footer: React.FC = () => {
  const appVersion = import.meta.env.VITE_REACT_APP_VERSION;
  const { Text } = Typography;

  return (
    <footer className="footer">
      <Flex justify="center" align="center">
        <Text>Money Manager v{appVersion}</Text>
        <Button type="link" href="https://github.com/AlbanesiDev" target="_blank">
          AlbanesiDev
        </Button>
      </Flex>
    </footer>
  );
};

export default Footer;
