"use client";

import { useEffect, useState } from "react";

/**
 * Resolves true once the intro loading screen has finished (or was skipped /
 * reduced-motion). Above-the-fold entrances gate on this so they rise as the
 * curtain clears, instead of playing — wastefully — underneath it.
 *
 * Coordinated via LoadingScreen, which sets `documentElement.dataset.intro`
 * and dispatches an `intro:done` event. A fallback timeout guarantees content
 * is never trapped hidden if the signal is missed.
 */
export function useIntroDone() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (document.documentElement.dataset.intro === "done") {
      setDone(true);
      return;
    }
    const onDone = () => setDone(true);
    window.addEventListener("intro:done", onDone);
    const fallback = window.setTimeout(onDone, 6500);
    return () => {
      window.removeEventListener("intro:done", onDone);
      window.clearTimeout(fallback);
    };
  }, []);

  return done;
}
