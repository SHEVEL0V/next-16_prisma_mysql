/** @format */

"use client";

import { useState, useCallback, useEffect } from "react";

/**
 * useLocalStorage Hook
 * Manages localStorage with React state synchronization
 *
 * @example
 * const [token, setToken] = useLocalStorage('auth_token', '');
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isClient, setIsClient] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    setIsClient(true);
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
    }
  }, [key]);

  // Set value in state and localStorage
  const setValue = useCallback(
    (value: T) => {
      try {
        setStoredValue(value);
        if (isClient) {
          window.localStorage.setItem(key, JSON.stringify(value));
        }
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, isClient],
  );

  // Remove value from localStorage
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (isClient) {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue, isClient]);

  return [storedValue, setValue, removeValue];
}

export default useLocalStorage;
