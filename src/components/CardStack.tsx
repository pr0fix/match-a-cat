import { useEffect, useState } from "react";
import type { Card } from "../types";
import { useCardStore } from "../stores/cardstore";
import catData from "../cats.json";
import { AnimatePresence } from "framer-motion";
import CardItem from "../components/CardItem";

const CardStack = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { setCards, currentCard, triggerNextCard } = useCardStore();

  useEffect(() => {
    const formattedCards: Card[] = catData.map((cat) => ({
      catImage: cat.image,
      name: cat.name,
      age: cat.age,
      type: cat.personality,
      location: `${cat.city}, ${cat.state}`,
      breed: cat.breed,
      gender: cat.gender,
    }));

    setCards(formattedCards);
  }, [setCards]);

  useEffect(() => {
    const unsubscribe = useCardStore.subscribe((state) => {
      setCurrentIndex(state.currentCardIdx);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const store = useCardStore.getState();
    if (store.cards.length > 0 && !currentCard) {
      store.setCurrentCardIdx(0);
    }
  }, [currentCard]);

  console.log("Current card index:", useCardStore.getState().currentCardIdx);

  return (
    <div className="flex justify-center items-center min-h-screen">
      {!currentCard && <div>No cards</div>}
      <AnimatePresence>
        {currentCard && (
          <CardItem
            key={currentIndex}
            card={currentCard}
            onSwipeComplete={triggerNextCard}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CardStack;
