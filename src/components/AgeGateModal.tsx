"use client";

import { useEffect, useState } from "react";
import { brand } from "@/lib/config";

const STORAGE_KEY = "po22-wiek-potwierdzony";

// To okno to bramka UX zgodna z dobrą praktyką e-commerce alkoholowego —
// nie zastępuje realnej weryfikacji tożsamości. Rzeczywista kontrola wieku
// (okazanie dowodu osobistego) odbywa się przy odbiorze zamówienia od kuriera.
export default function AgeGateModal() {
  const [status, setStatus] = useState<"checking" | "hidden" | "gate" | "blocked">("checking");

  useEffect(() => {
    const confirmed = typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY) === "1";
    setStatus(confirmed ? "hidden" : "gate");
  }, []);

  function confirmAdult() {
    localStorage.setItem(STORAGE_KEY, "1");
    setStatus("hidden");
  }

  if (status === "checking" || status === "hidden") return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-void/90 p-4 backdrop-blur-md"
    >
      <div className="card relative w-full max-w-md overflow-hidden p-8 text-center shadow-glow">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-gold/30 blur-3xl"
        />
        {status === "gate" && (
          <>
            <p className="eyebrow mb-3">Weryfikacja wieku</p>
            <h2 id="age-gate-title" className="text-2xl font-extrabold tracking-tight text-ink">
              Czy masz ukończone 18 lat?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {brand.name} dostarcza produkty alkoholowe wyłącznie osobom pełnoletnim.
              Kurier zweryfikuje Twój wiek na podstawie dowodu osobistego przy odbiorze
              zamówienia — bez okazania dokumentu towar nie zostanie wydany.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row-reverse">
              <button onClick={confirmAdult} className="btn-primary w-full sm:w-auto">
                Mam ukończone 18 lat
              </button>
              <button
                onClick={() => setStatus("blocked")}
                className="btn-secondary w-full sm:w-auto"
              >
                Nie mam 18 lat
              </button>
            </div>
          </>
        )}

        {status === "blocked" && (
          <>
            <h2 className="text-2xl font-extrabold tracking-tight text-ink">
              Ta strona jest dla osób pełnoletnich
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Niestety nie możemy udostępnić Ci tego serwisu. Wróć, gdy skończysz 18 lat.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
