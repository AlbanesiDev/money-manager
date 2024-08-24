import { ConfigProvider, theme } from "antd";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { useFirebaseApp, AuthProvider } from "reactfire";
import {
  ProfileContextProvider,
  TransactionModalProvider,
  ViewContextProvider,
  AuthProviderModal,
  MonthProvider,
  SyncModalContextProvider,
} from "../presentation/contexts";
import { useTheme } from "../presentation/hooks";

const ProvidersContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const app = useFirebaseApp();
  const auth = getAuth(app);
  const { darkMode } = useTheme();

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
  }, [darkMode]);

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <AuthProvider sdk={auth}>
        <MonthProvider>
          <ViewContextProvider>
            <TransactionModalProvider>
              <SyncModalContextProvider>
                <AuthProviderModal>
                  <ProfileContextProvider>{children}</ProfileContextProvider>
                </AuthProviderModal>
              </SyncModalContextProvider>
            </TransactionModalProvider>
          </ViewContextProvider>
        </MonthProvider>
      </AuthProvider>
    </ConfigProvider>
  );
};

export default ProvidersContainer;
