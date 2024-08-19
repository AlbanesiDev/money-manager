import { Flex } from "antd";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import { AuthModal, ProfileModal } from "../components";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="container">
        <Flex vertical justify="space-between" gap={48}>
          <Navbar />
          <Flex vertical gap={24}>
            {children}
          </Flex>
          <Footer />
        </Flex>
      </div>
      <ProfileModal />
      <AuthModal />
    </>
  );
};
export default Layout;
