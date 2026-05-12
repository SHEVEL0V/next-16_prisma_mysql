/** @format */

"use client";

import { useState, useCallback, useRef, useEffect } from "react";

type AsyncState<T> = {
  status: "idle" | "pending" | "success" | "error";
  data: T | null;
  error: Error | null;
};

/**
 * useAsync Hook
 * Manages async operations with loading, success, and error states
 *
 * @example
 * const { data, status, error } = useAsync(fetchUser, [userId]);
 */
export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  immediate = true,
): AsyncState<T> & { execute: () => Promise<void> } {
  const [state, setState] = useState<AsyncState<T>>({
    status: "idle",
    data: null,
    error: null,
  });

  const executeRef = useRef(false);

  const execute = useCallback(async () => {
    setState({ status: "pending", data: null, error: null });
    try {
      const response = await asyncFunction();
      setState({ status: "success", data: response, error: null });
    } catch (error) {
      setState({
        status: "error",
        data: null,
        error: error instanceof Error ? error : new Error(String(error)),
      });
    }
  }, [asyncFunction]);

  // Execute on mount if immediate is true
  useEffect(() => {
    if (immediate && !executeRef.current) {
      executeRef.current = true;
      execute();
    }
  }, [execute, immediate]);

  return { ...state, execute };
}

export default useAsync;
