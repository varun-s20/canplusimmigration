"use client";

import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/cn";
import styles from "./LoadingScreen.module.css";

const WORD = "CanPlus Immigration";
const BASE_DELAY = 1850; // ms — letters start as the mark slides left
const STEP = 34; // ms — per-letter stagger
const GAP = 26; // px — space between mark and wordmark

// The reveal finishes when the underline draw ends (~3660ms). Hold briefly so
// the finished lockup is readable, then fade the overlay out.
const HOLD = 4600;
const FADE = 600;

// Only play the intro once per browser session — subsequent loads skip it.
const SESSION_KEY = "canplus:intro-seen";

// Tell above-the-fold entrances (the hero) that the curtain is clearing, so
// they rise into view instead of animating underneath the overlay.
function signalIntroDone() {
  if (typeof document === "undefined") return;
  if (document.documentElement.dataset.intro === "done") return;
  document.documentElement.dataset.intro = "done";
  window.dispatchEvent(new Event("intro:done"));
}

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
      signalIntroDone();
      return;
    }

    const stage = stageRef.current;
    const mark = markRef.current;
    const word = wordRef.current;
    if (!stage || !mark || !word) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Scale the lockup as a single unit to fit any viewport, based on the
    // ACTUAL content bounds (not a fixed 16:9 box) so it reads large on phones
    // and never upscales past its native size on desktop. The red field is a
    // separate full-viewport layer, so scaling here can never create a seam.
    const fit = () => {
      const lockupW = mark.offsetWidth + GAP + word.offsetWidth;
      const lockupH = 230; // px: mark top → underline bottom, padded (smaller lockup)
      const margin = 0.88; // breathing room around the lockup
      const s = Math.min(
        (window.innerWidth * margin) / lockupW,
        (window.innerHeight * margin) / lockupH,
        1,
      );
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
      signalIntroDone();
      return;
    }

    const start = () => {
      measure();
      fit();
      stage.classList.add(styles.run);
      fadeTimer = setTimeout(() => {
        setFading(true);
        signalIntroDone(); // hero rises as the overlay fades out
      }, HOLD);
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
      {/* full-viewport grain over the continuous red field */}
      <div className={styles.grain} />

      <div ref={stageRef} className={styles.stage}>
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
      </div>
    </div>
  );
}
