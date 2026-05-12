/** @format */

"use client";

import { useEffect, useRef } from "react";

/**
 * usePrevious Hook
 * Returns previous value of a variable
 *
 * @example
 * const [count, setCount] = useState(0);
 * const prevCount = usePrevious(count);
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export default usePrevious;
