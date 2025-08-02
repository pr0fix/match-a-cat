import { useNavigate } from "react-router";
import "./App.css";
import CardStack from "./components/CardStack";
import useArrowKeys from "./hooks/useArrowKeys";
import { useAuthStore } from "./stores/authStore";
import { useEffect } from "react";

const App = () => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  useArrowKeys();

  useEffect(() => {
    !isAuthenticated && navigate("/login");
  }, [isAuthenticated]);

  return <>{isAuthenticated && <CardStack />}</>;
};

export default App;
