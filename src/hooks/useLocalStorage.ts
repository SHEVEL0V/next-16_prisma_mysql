/** @format */

"use client";

import { useState, useCallback, useEffect, useRef } from "react";

/**
 * useLocalStorage Hook
 * Manages localStorage with React state synchronization.
 * SSR-safe: initial render always uses initialValue, localStorage is read after mount.
 *
 * @example
 * const [token, setToken, removeToken] = useLocalStorage('auth_token', '');
 * setToken('abc');              // direct value
 * setToken(prev => prev + '!'); // functional updater
 * removeToken();                // clear and reset to initialValue
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  // Keep initialValue in a ref so it never needs to be a useCallback dependency
  const initialValueRef = useRef<T>(initialValue);

  // Always start with initialValue for SSR consistency (avoid hydration mismatch)
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Hydrate from localStorage after mount and whenever key changes
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      setStoredValue(item !== null ? (JSON.parse(item) as T) : initialValueRef.current);
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
    }
  }, [key]);

  // Set value in state and persist to localStorage.
  // Uses functional setStoredValue so no dependency on storedValue is needed.
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        try {
          const newValue = typeof value === "function" ? (value as (prev: T) => T)(prev) : value;
          window.localStorage.setItem(key, JSON.stringify(newValue));
          return newValue;
        } catch (error) {
          console.error(`Error setting localStorage key "${key}":`, error);
          return prev;
        }
      });
    },
    [key],
  );

  // Remove value from localStorage and reset state to initialValue
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValueRef.current);
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key]);

  return [storedValue, setValue, removeValue];
}

export default useLocalStorage;
