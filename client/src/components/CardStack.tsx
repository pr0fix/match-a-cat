import { useEffect, useState } from "react";
import { useCatStore } from "../stores/catStore";
import { AnimatePresence } from "framer-motion";
import CardItem from "../components/CardItem";

const CardStack = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { currentCat, isCatStackEmpty } = useCatStore();

  useEffect(() => {
    const unsubscribe = useCatStore.subscribe((state) => {
      setCurrentIndex(state.currentCatIdx);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const store = useCatStore.getState();
    if (store.cats.length > 0 && !currentCat) {
      store.setCurrentCatIdx(0);
    }
  }, [currentCat]);

  const cats = useCatStore.getState().cats;
  const nextCatIdx = currentIndex + 1;
  const nextCat = nextCatIdx < cats.length ? cats[nextCatIdx] : null;

  return (
    <div className="flex justify-center items-center">
      {!currentCat && !isCatStackEmpty && <div>Loading cats...</div>}
      {isCatStackEmpty ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <h2 className="text-xl font-bold mb-4">No more cats to swipe!</h2>
          <p>
            You've gone through all available cats. Please check again later.
          </p>
        </div>
      ) : (
        <div className="relative w-full max-w-sm">
          {nextCat && (
            <div className="absolute inset-0 z-0">
              <CardItem key={`next-${nextCatIdx}`} catCard={nextCat} />
            </div>
          )}

          {/* Current card on top */}
          <AnimatePresence>
            {currentCat && (
              <div className="relative z-10">
                <CardItem key={currentIndex} catCard={currentCat} />
              </div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default CardStack;
