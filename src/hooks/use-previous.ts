import { useState } from "react";

export function usePrevious<T>(value: T): T | undefined {
  const [previous, setPrevious] = useState<T | undefined>(undefined);
  const [current, setCurrent] = useState<T>(value);

  if (current !== value) {
    setPrevious(current);
    setCurrent(value);
  }

  return previous;
}

export default usePrevious;
