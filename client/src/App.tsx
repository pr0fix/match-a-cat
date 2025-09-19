import "./App.css";
import CardStack from "./components/CardStack";
import useArrowKeys from "./hooks/useArrowKeys";
import { useEffect, useRef } from "react";
import cat from "./services/cat";
import { useCatStore } from "./stores/catStore";
import { useAuthStore } from "./stores/authStore";

const App = () => {
  const { isAuthenticated } = useAuthStore();
  const { setCats, setCollection } = useCatStore();
  useArrowKeys();
  const fetchedRef = useRef(false);

  useEffect(() => {
    const fetchDailyCats = async () => {
      try {
        const res = await cat.getDailyCats();
        if (res.status === 200 && res.data) {
          setCats(res.data);
          console.log("Daily cats fetched successfully");
        } else {
          console.error("Failed to fetch daily cats:", res.message);
        }
      } catch (error) {
        console.error("Error fetching daily cats:", error);
      }
    };

    const fetchCollection = async () => {
      try {
        const res = await cat.getCollection();
        if (res.status === 200 && res.data.cats) {
          setCollection(res.data.cats);
          console.log("Collection fetched successfully");
        } else {
          console.error("Failed to fetch collection", res.message);
        }
      } catch (error) {
        console.error("Error fetching collection");
      }
    };

    if (isAuthenticated && !fetchedRef.current) {
      fetchDailyCats();
      fetchCollection();
      fetchedRef.current = true;
    }
  }, [isAuthenticated, setCats]);

  return <CardStack />;
};

export default App;
