import { useNavigate } from "react-router";
import "./App.css";
import CardStack from "./components/CardStack";
import useArrowKeys from "./hooks/useArrowKeys";
import { useAuthStore } from "./stores/authStore";
import { useEffect, useRef } from "react";
import Logout from "./components/Logout";
import cat from "./services/cat";
import { useCardStore } from "./stores/cardStore";

const App = () => {
  const { isAuthenticated } = useAuthStore();
  const { setCards } = useCardStore();
  const navigate = useNavigate();
  useArrowKeys();
  const fetchedRef = useRef(false);

  useEffect(() => {
    !isAuthenticated && navigate("/login");
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchDailyCats = async () => {
      try {
        const res = await cat.getDailyCats();
        if (res.status === 200 && res.data) {
          setCards(res.data);
          console.log("Daily cats fetched successfully");
        } else {
          console.error("Failed to fetch daily cats:", res.message);
        }
      } catch (error) {
        console.error("Error fetching daily cats:", error);
      }
    };

    if (isAuthenticated && !fetchedRef.current) {
      fetchDailyCats();
      fetchedRef.current = true;
    }
  }, [isAuthenticated, setCards]);

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
