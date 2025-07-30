import { create } from "zustand";
import { useAnimation } from "framer-motion";
import type { Card } from "../types";

interface CardState {
  cards: Card[];
  currentCardIdx: number;
  likedCards: Card[];
  dislikedCards: Card[];
  controls: ReturnType<typeof useAnimation> | null;
  previousActions: string[];

  currentCard: Card | null;

  setCards: (cards: Card[]) => void;
  setControls: (controls: ReturnType<typeof useAnimation>) => void;
  setCurrentCardIdx: (index: number) => void;

  triggerLike: () => void;
  triggerDislike: () => void;
  triggerUndo: () => void;
  triggerNextCard: () => void;
}

export const useCardStore = create<CardState>((set, get) => ({
  cards: [],
  currentCardIdx: 0,
  likedCards: [],
  dislikedCards: [],
  controls: null,
  previousActions: [],
  currentCard: null,

  setCards: (cards) => {
    const currentCard = cards.length > 0 ? cards[0] : null;
    set({ cards, currentCardIdx: 0, currentCard });
  },

  setControls: (controls) => set({ controls }),

  setCurrentCardIdx: (index) => {
    set((state) => {
      const newCard =
        state.cards.length > 0 && index < state.cards.length
          ? state.cards[index]
          : null;
      return {
        currentCardIdx: index,
        currentCard: newCard,
      };
    });
  },

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

  triggerNextCard: () => {
    set((state) => {
      const newIndex = state.currentCardIdx + 1;
      const newCard =
        state.cards.length > 0 && newIndex < state.cards.length
          ? state.cards[newIndex]
          : null;

      return {
        currentCardIdx: newIndex,
        currentCard: newCard,
      };
    });
  },
}));
