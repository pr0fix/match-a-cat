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
    const { controls, currentCard } = get();
    if (!controls || !currentCard) return;

    set((state) => ({
      previousActions: [...state.previousActions, "like"],
      likedCards: [...state.likedCards, currentCard],
    }));
    controls.start({
      x: 150,
      opacity: 0,
      rotateZ: 30,
      transition: { duration: 0.3, ease: "easeOut" },
    });
    console.log("you clicked Like");
    console.log("liked cards after pressing YES:", get().likedCards);
  },

  triggerDislike: () => {
    const { controls, currentCard } = get();
    if (!controls || !currentCard) return;

    set((state) => ({
      previousActions: [...state.previousActions, "dislike"],
      dislikedCards: [...state.dislikedCards, currentCard],
    }));
    controls.start({
      x: -150,
      opacity: 0,
      rotateZ: -30,
      transition: { duration: 0.3, ease: "easeOut" },
    });
    console.log("you clicked Nope");
    console.log("disliked cards after pressing NO:", get().dislikedCards);
  },

  triggerUndo: () => {
    const { controls, previousActions } = get();
    if (!controls) return;

    if (previousActions.length > 0) {
      const lastAction = previousActions[previousActions.length - 1];

      set((state) => {
        const newState: Partial<CardState> = {
          previousActions: state.previousActions.slice(0, -1),
        };

        if (lastAction === "like" && state.likedCards.length > 0) {
          newState.likedCards = state.likedCards.slice(0, -1);
        } else if (lastAction === "dislike" && state.dislikedCards.length > 0) {
          newState.dislikedCards = state.dislikedCards.slice(0, -1);
        }

        return newState;
      });

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
    console.log("disliked cards after undo", get().dislikedCards);
    console.log("liked cards after undo", get().likedCards);
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
