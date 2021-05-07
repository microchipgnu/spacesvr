import { useEffect, useState } from "react";

/**
 * Check validity of browser to run 3d experiences,
 * Automatically blacklists Facebook & Instagram in-app
 * browsers
 *
 * @param keywords
 */
export const useValidBrowser = (keywords?: string[]) => {
  const [valid, setValid] = useState(true);

  const INVALID_KEYWORDS = ["FBAN", "FBAV", "Instagram"].concat(keywords || []);

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || "";
    const valid = INVALID_KEYWORDS.filter((val) => ua.includes(val));
    setValid(valid.length === 0);
  }, []);

  return valid;
};

export function useKeyCode(key: string, callback: () => void, deps: any[]) {
  const onKeyPress = (e: KeyboardEvent) => {
    if (e.key.toLowerCase() === key) {
      callback();
    }
  };

  useEffect(() => {
    window.addEventListener("keypress", onKeyPress);
    return () => {
      window.removeEventListener("keypress", onKeyPress);
    };
  }, deps);
}
