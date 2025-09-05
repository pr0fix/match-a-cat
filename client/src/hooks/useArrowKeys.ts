import { useEffect } from "react";
import { useCardStore } from "../stores/cardStore";

/**
 * Event listener hook to capture arrow key presses
 * for users to be able to swipe cards with their keyboard
 */
const useArrowKeys = () => {
  const { triggerLike, triggerDislike, triggerUndo } = useCardStore();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowRight":
          triggerLike();
          break;
        case "ArrowLeft":
          triggerDislike();
          break;
        case "ArrowDown":
          triggerUndo();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [triggerLike, triggerDislike, triggerUndo]);
};

export default useArrowKeys;
