import "./App.css";
import CardStack from "./components/CardStack";
import Login from "./components/Login";
import useArrowKeys from "./hooks/useArrowKeys";
import { useAuthStore } from "./stores/authStore";

function App() {
  const { isAuthenticated } = useAuthStore();
  useArrowKeys();

  return <>{isAuthenticated ? <CardStack /> : <Login />}</>;
}

export default App;
