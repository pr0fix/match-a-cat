import { create } from "zustand";
import { useAnimation } from "framer-motion";
import type { Cat } from "../utils/types";

type PreviousAction = [action: "like" | "dislike", idx: number];

interface CatState {
  cats: Cat[];
  catsLoaded: boolean;
  currentCatIdx: number;
  likedCats: Cat[];
  dislikedCats: Cat[];
  controls: ReturnType<typeof useAnimation> | null;
  previousActions: PreviousAction[];
  undoPending: boolean;
  lastUndoAction: PreviousAction | null;
  currentCat: Cat | null;
  isCatStackEmpty: boolean;
  cardLocked: boolean;
  undoCount: number;

  setCats: (cats: Cat[]) => void;
  setControls: (controls: ReturnType<typeof useAnimation>) => void;
  setCurrentCatIdx: (index: number) => void;

  triggerLike: () => void;
  triggerDislike: () => void;
  triggerUndo: () => void;
  triggerNextCat: () => void;
}

export const useCatStore = create<CatState>((set, get) => ({
  cats: [],
  catsLoaded: false,
  currentCatIdx: 0,
  likedCats: [],
  dislikedCats: [],
  controls: null,
  previousActions: [],
  currentCat: null,
  undoPending: false,
  lastUndoAction: null,
  isCatStackEmpty: false,
  cardLocked: false,
  undoCount: 0,

  setCats: (cats) => {
    const currentCat = cats.length > 0 ? cats[0] : null;
    set({ cats, currentCatIdx: 0, currentCat, catsLoaded: true });
  },

  setControls: (controls) => set({ controls }),

  setCurrentCatIdx: (index) => {
    set((state) => {
      const newCat =
        state.cats.length > 0 && index < state.cats.length
          ? state.cats[index]
          : null;
      return {
        currentCatIdx: index,
        currentCat: newCat,
        cardLocked: false,
      };
    });
  },

  triggerLike: () => {
    const { controls, currentCat, cardLocked, currentCatIdx } = get();
    if (!controls || !currentCat || cardLocked) return;

    set({ cardLocked: true });
    set((state) => ({
      previousActions: [...state.previousActions, ["like", currentCatIdx]],
      likedCats: [...state.likedCats, currentCat],
    }));
    controls
      .start({
        x: 150,
        opacity: 0,
        rotateZ: 30,
        transition: { duration: 0.3, ease: "easeOut" },
      })
      .then(() => {
        get().triggerNextCat();
      });
  },

  triggerDislike: () => {
    const { controls, currentCat, cardLocked, currentCatIdx } = get();
    if (!controls || !currentCat || cardLocked) return;

    set({ cardLocked: true });
    set((state) => ({
      previousActions: [...state.previousActions, ["dislike", currentCatIdx]],
      dislikedCats: [...state.dislikedCats, currentCat],
    }));
    controls
      .start({
        x: -150,
        opacity: 0,
        rotateZ: -30,
        transition: { duration: 0.3, ease: "easeOut" },
      })
      .then(() => {
        get().triggerNextCat();
      });
  },

  triggerUndo: () => {
    const { previousActions, undoCount, currentCatIdx } = get();
    if (previousActions.length === 0 || undoCount >= 5) return;

    const [lastAction, lastIdx] = previousActions[previousActions.length - 1];

    if (lastIdx !== currentCatIdx - 1) return;

    set({ undoPending: true, lastUndoAction: [lastAction, lastIdx] });

    set((state) => {
      const newState: Partial<CatState> = {
        undoCount: state.undoCount + 1,
        previousActions: [],
      };

      let previousCat: Cat | null = null;

      if (lastAction === "like" && state.likedCats.length > 0) {
        previousCat = state.likedCats[state.likedCats.length - 1];
        newState.likedCats = state.likedCats.slice(0, -1);
      } else if (lastAction === "dislike" && state.dislikedCats.length > 0) {
        previousCat = state.dislikedCats[state.dislikedCats.length - 1];
        newState.dislikedCats = state.dislikedCats.slice(0, -1);
      }

      if (previousCat) {
        newState.currentCat = previousCat;
        newState.currentCatIdx = lastIdx;
      }

      return newState;
    });
  },

  triggerNextCat: () => {
    set((state) => {
      const newIndex = state.currentCatIdx + 1;

      if (newIndex >= state.cats.length) {
        return {
          currentCatIdx: state.cats.length,
          currentCat: null,
          isCatStackEmpty: true,
          cardLocked: false,
        };
      }

      const newCat = state.cats[newIndex];

      return {
        currentCatIdx: newIndex,
        currentCat: newCat,
        isCatStackEmpty: false,
        cardLocked: false,
      };
    });
  },
}));
