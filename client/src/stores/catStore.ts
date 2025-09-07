import { create } from "zustand";
import { useAnimation } from "framer-motion";
import type { Cat } from "../utils/types";

interface CatState {
  cats: Cat[];
  currentCatIdx: number;
  likedCats: Cat[];
  dislikedCats: Cat[];
  controls: ReturnType<typeof useAnimation> | null;
  previousActions: string[];
  undoPending: boolean;
  lastUndoAction: string | null;
  currentCat: Cat | null;
  isCatStackEmpty: boolean;

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
  currentCatIdx: 0,
  likedCats: [],
  dislikedCats: [],
  controls: null,
  previousActions: [],
  currentCat: null,
  undoPending: false,
  lastUndoAction: null,
  isCatStackEmpty: false,

  setCats: (cats) => {
    const currentCat = cats.length > 0 ? cats[0] : null;
    set({ cats, currentCatIdx: 0, currentCat });
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
      };
    });
  },

  triggerLike: () => {
    const { controls, currentCat } = get();
    if (!controls || !currentCat) return;

    set((state) => ({
      previousActions: [...state.previousActions, "like"],
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
    const { controls, currentCat } = get();
    if (!controls || !currentCat) return;

    set((state) => ({
      previousActions: [...state.previousActions, "dislike"],
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
    const { previousActions } = get();
    if (previousActions.length === 0) return;

    const lastAction = previousActions[previousActions.length - 1];

    set({ undoPending: true, lastUndoAction: lastAction });

    set((state) => {
      const newState: Partial<CatState> = {
        previousActions: state.previousActions.slice(0, -1),
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

        const catIdx = state.cats.findIndex(
          (cat) => cat.mongoId === previousCat.mongoId
        );

        if (catIdx > 0) {
          newState.currentCatIdx = catIdx;
        } else {
          newState.currentCatIdx = Math.max(0, state.currentCatIdx - 1);
        }
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
        };
      }

      const newCat = state.cats[newIndex];

      return {
        currentCatIdx: newIndex,
        currentCat: newCat,
        isCatStackEmpty: false,
      };
    });
  },
}));
