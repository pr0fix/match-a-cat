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
  undoPending: boolean;
  lastUndoAction: string | null;
  currentCard: Card | null;
  isCardStackEmpty: boolean;

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
  undoPending: false,
  lastUndoAction: null,
  isCardStackEmpty: false,

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
    controls
      .start({
        x: 150,
        opacity: 0,
        rotateZ: 30,
        transition: { duration: 0.3, ease: "easeOut" },
      })
      .then(() => {
        get().triggerNextCard();
      });
  },

  triggerDislike: () => {
    const { controls, currentCard } = get();
    if (!controls || !currentCard) return;

    set((state) => ({
      previousActions: [...state.previousActions, "dislike"],
      dislikedCards: [...state.dislikedCards, currentCard],
    }));
    controls
      .start({
        x: -150,
        opacity: 0,
        rotateZ: -30,
        transition: { duration: 0.3, ease: "easeOut" },
      })
      .then(() => {
        get().triggerNextCard();
      });
  },

  triggerUndo: () => {
    const { previousActions } = get();
    if (previousActions.length === 0) return;

    const lastAction = previousActions[previousActions.length - 1];

    set({ undoPending: true, lastUndoAction: lastAction });

    set((state) => {
      const newState: Partial<CardState> = {
        previousActions: state.previousActions.slice(0, -1),
      };

      let previousCard: Card | null = null;

      if (lastAction === "like" && state.likedCards.length > 0) {
        previousCard = state.likedCards[state.likedCards.length - 1];
        newState.likedCards = state.likedCards.slice(0, -1);
      } else if (lastAction === "dislike" && state.dislikedCards.length > 0) {
        previousCard = state.dislikedCards[state.dislikedCards.length - 1];
        newState.dislikedCards = state.dislikedCards.slice(0, -1);
      }

      if (previousCard) {
        newState.currentCard = previousCard;

        const cardIdx = state.cards.findIndex(
          (card) => card.id === previousCard.id
        );

        if (cardIdx > 0) {
          newState.currentCardIdx = cardIdx;
        } else {
          newState.currentCardIdx = Math.max(0, state.currentCardIdx - 1);
        }
      }

      return newState;
    });
  },

  triggerNextCard: () => {
    set((state) => {
      const newIndex = state.currentCardIdx + 1;

      if (newIndex >= state.cards.length) {
        return {
          currentCardIdx: state.cards.length,
          currentCard: null,
          isCardStackEmpty: true,
        };
      }

      const newCard = state.cards[newIndex];

      return {
        currentCardIdx: newIndex,
        currentCard: newCard,
        isCardStackEmpty: false,
      };
    });
  },
}));
