import Link from "next/link";
import type React from "react";

export default function ScreenHeader({
  backHref,
  title,
  right
}: {
  backHref: string;
  title?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <Link
        href={backHref}
        aria-label="Wróć"
        className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-surface text-ink transition hover:bg-surface2"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
      {title && <h1 className="text-lg font-bold text-ink">{title}</h1>}
      {right ?? <span className="h-11 w-11" aria-hidden />}
    </div>
  );
}
