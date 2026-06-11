"use client";

import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/cn";
import styles from "./LoadingScreen.module.css";

const WORD = "CanPlus Immigration";
const BASE_DELAY = 1850; // ms — letters start as the mark slides left
const STEP = 34; // ms — per-letter stagger
const GAP = 36; // px — space between mark and wordmark

// The reveal finishes when the underline draw ends (~3660ms). Hold briefly so
// the finished lockup is readable, then fade the overlay out.
const HOLD = 4600;
const FADE = 600;

// Only play the intro once per browser session — subsequent loads skip it.
const SESSION_KEY = "canplus:intro-seen";

/**
 * Site loading screen — a cinematic maple-leaf + wordmark reveal for CanPlus
 * Immigration. Plays once per browser session, then fades away.
 */
export function LoadingScreen() {
  const [fading, setFading] = useState(false);
  const [gone, setGone] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Already played this session? Skip straight to the site, no intro.
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // sessionStorage unavailable (privacy mode) — fall through and play once.
    }
    if (seen) {
      setGone(true);
      return;
    }

    const stage = stageRef.current;
    const mark = markRef.current;
    const word = wordRef.current;
    if (!stage || !mark || !word) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Position the stage so the scaled 16:9 lockup fits any viewport, exactly
    // like the reference.
    const fit = () => {
      const s = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
      stage.style.transform = `translate(-50%, -50%) scale(${s})`;
    };

    // Compute the mark/word shifts so the final mark + gap + wordmark lockup is
    // centered (depends on the rendered wordmark width).
    const measure = () => {
      const Wm = mark.offsetWidth;
      const Ww = word.offsetWidth;
      stage.style.setProperty("--mark-shift", `${(GAP + Ww) / 2}px`);
      stage.style.setProperty("--word-shift", `${(Wm + GAP) / 2}px`);
    };

    // Per-letter stagger delays.
    Array.from(word.children).forEach((el, i) => {
      (el as HTMLElement).style.animationDelay = `${BASE_DELAY + i * STEP}ms`;
    });

    // Lock scroll while the intro is on screen.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const release = () => {
      document.body.style.overflow = prevOverflow;
    };

    let fadeTimer: ReturnType<typeof setTimeout>;
    let goneTimer: ReturnType<typeof setTimeout>;

    // Reduced motion: skip the reveal entirely, no flashing intro.
    if (reduced) {
      release();
      setGone(true);
      return;
    }

    const start = () => {
      measure();
      fit();
      stage.classList.add(styles.run);
      fadeTimer = setTimeout(() => setFading(true), HOLD);
      goneTimer = setTimeout(() => {
        setGone(true);
        release();
      }, HOLD + FADE);
    };

    // Measure after fonts settle so the wordmark width is correct.
    if (document.fonts && document.fonts.ready) {
      let started = false;
      const begin = () => {
        if (started) return;
        started = true;
        start();
      };
      document.fonts.ready.then(begin);
      // Fallback if font loading hangs.
      const fontFallback = setTimeout(begin, 1200);
      window.addEventListener("resize", fit);
      return () => {
        clearTimeout(fontFallback);
        clearTimeout(fadeTimer);
        clearTimeout(goneTimer);
        window.removeEventListener("resize", fit);
        release();
      };
    }

    start();
    window.addEventListener("resize", fit);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(goneTimer);
      window.removeEventListener("resize", fit);
      release();
    };
  }, []);

  if (gone) return null;

  return (
    <div className={cn(styles.overlay, fading && styles.fadeOut)} aria-hidden>
      <div ref={stageRef} className={styles.stage}>
        <div className={styles.glow} />

        <div ref={markRef} className={styles.mark}>
          <Logo className={styles.logo} />
          <div className={styles.glint} />
        </div>

        <div ref={wordRef} className={styles.wordmark}>
          {Array.from(WORD).map((ch, i) => (
            <span key={i} className={styles.letter}>
              {ch === " " ? " " : ch}
            </span>
          ))}
        </div>

        <div className={styles.tagline}>Your Canadian future, expertly guided.</div>
        <div className={styles.underline}>
          <div className={styles.underlineFill} />
        </div>

        <div className={styles.grain} />
      </div>
    </div>
  );
}
