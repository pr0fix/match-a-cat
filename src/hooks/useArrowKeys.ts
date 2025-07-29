import { useEffect } from "react";

const useArrowKeys = (onButtonClick: (btnType: string) => void) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowDown":
          onButtonClick("undo");
          break;
        case "ArrowLeft":
          onButtonClick("dislike");
          break;
        case "ArrowRight":
          onButtonClick("like");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onButtonClick]);
};

export default useArrowKeys;
