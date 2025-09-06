import "./App.css";
import CardStack from "./components/CardStack";
import useArrowKeys from "./hooks/useArrowKeys";
import { useEffect, useRef } from "react";
import cat from "./services/cat";
import { useCardStore } from "./stores/cardStore";
import { useAuthStore } from "./stores/authStore";

const App = () => {
  const { isAuthenticated } = useAuthStore();
  const { setCards } = useCardStore();
  useArrowKeys();
  const fetchedRef = useRef(false);

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

  return <CardStack />;
};

export default App;
