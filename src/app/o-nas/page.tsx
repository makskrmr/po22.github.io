import { brand } from "@/lib/config";

export default function ONasPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="eyebrow mb-2">O firmie</p>
      <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        Nowoczesna logistyka nocy
      </h1>

      <div className="prose prose-invert mt-8 max-w-none space-y-5 text-sm leading-relaxed text-muted sm:text-base">
        <p>
          {brand.name} to firma logistyczna specjalizująca się w dostawach nocnych. Powstaliśmy,
          bo zauważyliśmy prosty problem: godziny, w których najtrudniej o cokolwiek dowieźć do
          domu, to często godziny, w których jest to najbardziej potrzebne. Zbudowaliśmy zespół
          kierowców, flotę i technologię, które odpowiadają na ten problem — szybko, dyskretnie
          i w sposób przewidywalny dla klienta.
        </p>
        <p>
          Nie jesteśmy sklepem monopolowym i nie sprzedajemy alkoholu. Jesteśmy pośrednikiem i
          przewoźnikiem: nasi kurierzy realizują zakupy w placówkach posiadających ważną koncesję
          na sprzedaż napojów alkoholowych, działając na podstawie pełnomocnictwa udzielanego im
          przez klienta w procesie zamówienia. Ten model opiera się na instytucji pełnomocnictwa
          uregulowanej w Kodeksie cywilnym i jest zaprojektowany tak, aby jasno rozdzielać rolę
          sprzedawcy (koncesjonowany punkt sprzedaży) od roli przewoźnika ({brand.name}).
        </p>
        <p>
          Każde zamówienie jest w pełni identyfikowalne: klient wie, co kupuje, w jakiej cenie i
          na jakich zasadach, a status realizacji może śledzić od momentu złożenia zamówienia do
          dostawy pod drzwi. Płatność następuje w całości online, przed realizacją — nie
          przyjmujemy gotówki przy odbiorze. Każdy kurier ma obowiązek zweryfikować pełnoletność
          klienta na podstawie dowodu osobistego przed wydaniem zamówienia.
        </p>
        <p>
          Stale monitorujemy zmieniające się lokalne przepisy dotyczące godzin sprzedaży alkoholu
          i na bieżąco dostosowujemy do nich naszą sieć punktów zakupowych oraz procedury —
          traktujemy to jako podstawowy element odpowiedzialnego prowadzenia tego biznesu, a nie
          jednorazową formalność.
        </p>
      </div>
    </div>
  );
}
