import { useEffect } from "react";
import { useCardStore } from "../stores/cardStore";

const useArrowKeys = () => {
  const { triggerLike, triggerDislike, triggerUndo } = useCardStore();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowRight":
          console.log("right arrow pressed");
          triggerLike();
          break;
        case "ArrowLeft":
          console.log("left arrow pressed");
          triggerDislike();
          break;
        case "ArrowDown":
          console.log("down arrow pressed");
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
