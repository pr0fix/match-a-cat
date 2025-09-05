import { useEffect, useState } from "react";
import { useCardStore } from "../stores/cardStore";
import { AnimatePresence } from "framer-motion";
import CardItem from "../components/CardItem";

const CardStack = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { currentCard, isCardStackEmpty } = useCardStore();

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

  const cards = useCardStore.getState().cards;
  const nextCardIdx = currentIndex + 1;
  const nextCard = nextCardIdx < cards.length ? cards[nextCardIdx] : null;

  return (
    <div className="flex justify-center items-center min-h-screen">
      {!currentCard && !isCardStackEmpty && <div>Loading cats...</div>}
      {isCardStackEmpty ? (
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4">No more cats to swipe!</h2>
          <p>
            You've gone through all available cats. Please check again later.
          </p>
        </div>
      ) : (
        <div className="relative w-full max-w-sm">
          {nextCard && (
            <div className="absolute inset-0 z-0">
              <CardItem key={`next-${nextCardIdx}`} card={nextCard} />
            </div>
          )}

          {/* Current card on top */}
          <AnimatePresence>
            {currentCard && (
              <div className="relative z-10">
                <CardItem key={currentIndex} card={currentCard} />
              </div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default CardStack;
