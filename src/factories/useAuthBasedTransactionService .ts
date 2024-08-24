import { useAuth } from "reactfire";
import { AuthBasedTransactionService } from "../data/services/AuthBasedTransactionService";

const useAuthBasedTransactionService = () => {
  const auth = useAuth();
  return new AuthBasedTransactionService(auth.currentUser);
};

export { useAuthBasedTransactionService };
