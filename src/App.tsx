import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./contexts/AuthContext";
import RootRouter from "./router/RootRouter";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RootRouter />
        <ToastContainer />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
