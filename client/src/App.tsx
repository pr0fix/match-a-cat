import { useNavigate } from "react-router";
import "./App.css";
import CardStack from "./components/CardStack";
import useArrowKeys from "./hooks/useArrowKeys";
import { useAuthStore } from "./stores/authStore";
import { useEffect } from "react";
import Logout from "./components/Logout";
import cat from "./services/cat";

const App = () => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  useArrowKeys();

  useEffect(() => {
    !isAuthenticated && navigate("/login");
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchDailyCats = async () => {
      try {
        const res = await cat.getDailyCats();
        if (res.status === 200) {
          console.log("Daily cats fetched successfully");
        }
      } catch (error) {
        console.error("Error fetching daily cats:", error);
      }
    };

    if (isAuthenticated) {
      fetchDailyCats();
    }
  }, [isAuthenticated]);

  return (
    <>
      {isAuthenticated && (
        <div>
          <div className="absolute top-4 right-4">
            <Logout />
          </div>
          <CardStack />
        </div>
      )}
    </>
  );
};

export default App;
