/** @format */

"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * useMount Hook
 * Executes callback only once when component mounts
 */
export const useMount = (callback: () => void) => {
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      callback();
    }
  }, [callback]);
};

export default useMount;
