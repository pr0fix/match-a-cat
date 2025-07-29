import { create } from "zustand";
import { useAnimation } from "framer-motion";

interface CardState {
  controls: ReturnType<typeof useAnimation> | null;
  previousActions: string[];
  setControls: (controls: ReturnType<typeof useAnimation>) => void;
  triggerLike: () => void;
  triggerDislike: () => void;
  triggerUndo: () => void;
}

export const useCardStore = create<CardState>((set, get) => ({
  controls: null,
  previousActions: [],

  setControls: (controls) => set({ controls }),

  triggerLike: () => {
    const { controls } = get();
    if (!controls) return;

    set((state) => ({ previousActions: [...state.previousActions, "like"] }));
    controls.start({
      x: 150,
      opacity: 0,
      rotateZ: 30,
      transition: { duration: 0.3, ease: "easeOut" },
    });
    console.log("you clicked Like");
  },

  triggerDislike: () => {
    const { controls } = get();
    if (!controls) return;

    set((state) => ({
      previousActions: [...state.previousActions, "dislike"],
    }));
    controls.start({
      x: -150,
      opacity: 0,
      rotateZ: -30,
      transition: { duration: 0.3, ease: "easeOut" },
    });
    console.log("you clicked Nope");
  },

  triggerUndo: () => {
    const { controls, previousActions } = get();
    if (!controls) return;

    if (previousActions.length > 0) {
      set((state) => ({ previousActions: state.previousActions.slice(0, -1) }));
      controls.start({
        x: 0,
        opacity: 1,
        rotateZ: 0,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 20,
        },
      });
      console.log("Undoing last action");
    } else {
      console.log("Nothing to undo");
    }
  },
}));
