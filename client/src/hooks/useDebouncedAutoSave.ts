import { useEffect, useRef } from "react";
import type { Cat } from "../utils/types";

interface DebounceHookProps {
  collection: Cat[];
  saveCollection: (collection: Cat[]) => void;
  delay: number;
}

const useDebouncedAutoSave = ({
  collection,
  saveCollection,
  delay = 5000,
}: DebounceHookProps) => {
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      saveCollection(collection);
    }, delay);

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [collection, saveCollection, delay]);
};

export default useDebouncedAutoSave;
