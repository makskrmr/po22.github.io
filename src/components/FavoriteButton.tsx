"use client";

import { useState } from "react";

export default function FavoriteButton() {
  const [active, setActive] = useState(false);

  return (
    <button
      onClick={() => setActive((v) => !v)}
      aria-pressed={active}
      aria-label="Dodaj do ulubionych"
      className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-surface text-ink transition hover:bg-surface2"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} className={active ? "text-gold-bright" : ""} aria-hidden>
        <path
          d="M12 20s-7-4.35-9.5-8.6C.9 8.2 2.3 5 5.6 5c1.9 0 3.3 1 4 2.4C10.3 6 11.7 5 13.6 5c3.3 0 4.7 3.2 3.1 6.4C19.2 15.65 12 20 12 20z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
