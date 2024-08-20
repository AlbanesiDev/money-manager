import ProviderContainer from "./config/ProvidersContainer.component";
import Layout from "./presentation/layout/Layout";
import HomePage from "./presentation/pages/Home.page";

function App() {
  return (
    <ProviderContainer>
      <Layout>
        <HomePage />
      </Layout>
    </ProviderContainer>
  );
}

export default App;
