import { useEffect, useRef } from "react";

const useDebouncedAutoSave = (
  catIds: string[],
  saveCollection: (catIds: string[]) => void,
  delay: number
) => {
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      saveCollection(catIds);
    }, delay);

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [catIds, saveCollection, delay]);
};

export default useDebouncedAutoSave;
