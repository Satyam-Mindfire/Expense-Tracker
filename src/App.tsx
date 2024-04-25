import { AuthProvider } from "./contexts/AuthContext";
import RootRouter from "./router/RootRouter";

function App() {
  return (
    <AuthProvider>
      <RootRouter />
    </AuthProvider>
  );
}

export default App;
