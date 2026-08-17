/**
 * Konfiguracja modelu operacyjnego "po22".
 *
 * WAŻNE — do zweryfikowania przed startem i cyklicznie (np. raz w miesiącu):
 * Coraz więcej gmin wokół dużych miast wprowadza własne uchwały o nocnej
 * prohibicji (na podstawie ustawy o wychowaniu w trzeźwości). Miejscowość
 * wskazana dziś jako "strefa bazowa" (punkt zakupu poza zakazem) może w
 * dowolnym momencie sama wprowadzić taki zakaz — tak jak stało się to m.in.
 * z Piasecznem. Model operacyjny wymaga więc stałego monitoringu uchwał
 * lokalnych rad gmin, a nie jednorazowego wyboru miejscowości na starcie.
 * Nie hardkoduj lokalizacji w treściach — czerp ją z tej konfiguracji.
 */

export type ServiceZone = {
  /** Miasto, w którym obowiązuje nocna prohibicja i które obecnie obsługujemy — wyłącznie Warszawa */
  customerZoneLabel: string;
  /** Aktualna (weryfikowana na bieżąco) miejscowość bazowa punktu zakupu */
  purchaseZoneLabel: string;
  /** Godziny obowiązywania lokalnej prohibicji w strefie klienta */
  prohibitionHours: string;
};

export const activeZone: ServiceZone = {
  customerZoneLabel: "Warszawa",
  // UWAGA: przykładowa wartość — PODMIEŃ na aktualnie zweryfikowaną
  // miejscowość bez nocnego zakazu sprzedaży, zanim uruchomisz produkcyjnie.
  purchaseZoneLabel: "[miejscowość bez nocnej prohibicji — do potwierdzenia]",
  prohibitionHours: "22:00–6:00"
};

export const brand = {
  name: process.env.NEXT_PUBLIC_BRAND_NAME ?? "po22",
  tagline: "Ty zamawiasz, my jedziemy.",
  supportPhone: process.env.NEXT_PUBLIC_SUPPORT_PHONE ?? "+48 676 767 676",
  deliveryPromiseMinutes: 30,
  deliveryFeeCents: 999,
  // Serwis działa wyłącznie na terenie jednego miasta — patrz activeZone.customerZoneLabel.
  serviceCity: "Warszawa",
  developerCredit: "Kramar M."
};

export const categories = [
  { key: "PIWO", label: "Piwo" },
  { key: "WODKA", label: "Wódka" },
  { key: "WINO", label: "Wino" },
  { key: "PRZEKASKI", label: "Przekąski" },
  { key: "NAPOJE_BEZALKOHOLOWE", label: "Napoje bezalkoholowe" }
] as const;

export function categoryLabel(key: string): string {
  return categories.find((c) => c.key === key)?.label ?? key;
}
