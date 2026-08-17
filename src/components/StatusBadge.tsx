const statusStyles: Record<string, string> = {
  NOWE: "bg-gold/15 text-gold-bright border-gold/40",
  PRZYJETE: "bg-surface2 text-ink border-line",
  W_ZAKUPACH: "bg-ember/15 text-ember-bright border-ember/40",
  W_DRODZE: "bg-ember/15 text-ember-bright border-ember/40",
  DOSTARCZONE: "bg-lime/15 text-lime border-lime/40",
  ANULOWANE: "bg-danger/15 text-danger border-danger/40",
  OCZEKUJE: "bg-surface2 text-muted border-line",
  OPLACONE: "bg-lime/15 text-lime border-lime/40",
  NIEUDANE: "bg-danger/15 text-danger border-danger/40",
  ZWROCONE: "bg-surface2 text-muted border-line"
};

const statusLabels: Record<string, string> = {
  NOWE: "Nowe",
  PRZYJETE: "Przyjęte",
  W_ZAKUPACH: "W zakupach",
  W_DRODZE: "W drodze",
  DOSTARCZONE: "Dostarczone",
  ANULOWANE: "Anulowane",
  OCZEKUJE: "Oczekuje",
  OPLACONE: "Opłacone",
  NIEUDANE: "Nieudane",
  ZWROCONE: "Zwrócone"
};

export default function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${
        statusStyles[status] ?? "border-line bg-surface2 text-muted"
      }`}
    >
      {statusLabels[status] ?? status}
    </span>
  );
}
