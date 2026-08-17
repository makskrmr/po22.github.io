export function formatPrice(cents: number): string {
  return (cents / 100).toLocaleString("pl-PL", {
    style: "currency",
    currency: "PLN"
  });
}

export function formatVolume(volumeMl?: number | null, weightG?: number | null): string {
  if (volumeMl) {
    return volumeMl >= 1000 ? `${(volumeMl / 1000).toLocaleString("pl-PL")} l` : `${volumeMl} ml`;
  }
  if (weightG) {
    return weightG >= 1000 ? `${(weightG / 1000).toLocaleString("pl-PL")} kg` : `${weightG} g`;
  }
  return "";
}

export function formatAbv(abv?: number | null): string | null {
  if (abv === null || abv === undefined) return null;
  return `${abv.toLocaleString("pl-PL")}% obj.`;
}
