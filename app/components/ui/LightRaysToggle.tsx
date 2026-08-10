"use client";

import { useSyncExternalStore } from "react";
import styles from "./LightRaysToggle.module.css";

const STORAGE_KEY = "smweb:lightrays";
const EVENT_NAME = "smweb:lightrays";

function readEnabled(): boolean {
  return window.localStorage.getItem(STORAGE_KEY) !== "off";
}

function subscribeEnabled(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(EVENT_NAME, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(EVENT_NAME, callback);
  };
}

function setEnabled(next: boolean) {
  window.localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
  window.dispatchEvent(new Event(EVENT_NAME));
}

// SSR default matches the "always on" starting state so first paint
// on the server agrees with the client for the common case.
export function useLightRaysEnabled(): boolean {
  return useSyncExternalStore(subscribeEnabled, readEnabled, () => true);
}

interface LightRaysToggleProps {
  label: string;
}

export default function LightRaysToggle({ label }: LightRaysToggleProps) {
  const enabled = useLightRaysEnabled();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={label}
      onClick={() => setEnabled(!enabled)}
      className={styles.mount}
    >
      <div className={styles.plate}>
        <div
          className={`${styles.well} ${enabled ? styles.wellOn : styles.wellOff}`}
        >
          <span
            aria-hidden
            className={`${styles.rocker} ${enabled ? styles.rockerOn : styles.rockerOff}`}
          />
        </div>
      </div>
    </button>
  );
}
