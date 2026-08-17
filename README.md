# po22

Prototyp/MVP platformy e-commerce do nocnego zamawiania alkoholu i przekąsek
na terenie Warszawy, zbudowany w modelu opartym na pełnomocnictwie kuriera.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Prisma + PostgreSQL · Stripe (karta/BLIK) · Zustand

**Autor:** Kramar M.

---

## 1. Szybki start

```bash
npm install

# skonfiguruj zmienne środowiskowe
cp .env.example .env
# uzupełnij DATABASE_URL, a docelowo klucze Stripe i ADMIN_ACCESS_KEY

# utwórz tabele w bazie i wypełnij przykładowymi produktami
npm run db:push
npm run db:seed

npm run dev
```

Aplikacja wystartuje na `http://localhost:3000`.
Panel kuriera: `http://localhost:3000/admin/kurier` (login: klucz z `ADMIN_ACCESS_KEY`).

Bez skonfigurowanego `DATABASE_URL` katalog produktów i strona główna nadal
działają — korzystają wtedy z danych przykładowych w `src/lib/sample-products.ts`.
Do checkoutu i panelu kuriera baza danych jest już wymagana.

Bez `STRIPE_SECRET_KEY` checkout działa w **trybie deweloperskim**: zamiast
prawdziwej płatności pojawia się przycisk symulujący sukces płatności — wyłącznie
do testów lokalnych.

---

## 2. Struktura projektu

```
prisma/schema.prisma        modele: Product (z marką i krajem), Order, OrderItem, Courier
src/lib/config.ts           marka (po22), strefa obsługi (Warszawa), opłata dostawy
src/lib/payments.ts         integracja Stripe (karta + BLIK) + tryb dev
src/lib/cart-store.ts       koszyk (Zustand + localStorage)
src/app/sklep                katalog produktów, wyszukiwarka, filtr kategorii
src/app/sklep/[slug]         strona pojedynczego produktu (specyfikacja + dodaj do koszyka)
src/app/koszyk               koszyk z rozbiciem suma częściowa / dostawa / razem
src/app/checkout              dane dostawy, wymagane zgody, płatność
src/app/jak-to-dziala         strona procesu (3 kroki)
src/app/o-nas                 strona o firmie
src/app/regulamin             regulamin / model prawny usługi
src/app/admin/kurier          panel kuriera (chroniony middleware.ts)
```

---

## 3. Marki, kraje pochodzenia i zdjęcia produktowe

Każdy produkt ma teraz pole `brand` (marka) i opcjonalnie `country` (kraj
pochodzenia) — patrz `src/lib/sample-products.ts`. Użyte marki są **celowo
fikcyjne** (np. "Biała Orlica", "Stary Chmiel") — nie są to istniejące,
zastrzeżone marki alkoholi. Przed produkcją podmień je na rzeczywisty
asortyment z odpowiednimi licencjami/umowami z producentami.

Grafiki w `public/products/*.svg` to **stylizowane placeholdery wektorowe na
przezroczystym tle**, nie prawdziwe zdjęcia produktowe — to narzędzie nie ma
możliwości generowania fotorealistycznych zdjęć. Przed startem zastąp je
realną fotografią produktową (najlepiej też na przezroczystym/jednolitym tle,
zgodnie z oryginalną specyfikacją).

---

## 4. Czego NIE zawiera ten prototyp — do zrobienia przed produkcją

- **Webhook Stripe** — potwierdzenie płatności przez `paymentIntent.succeeded`
  zamiast (albo obok) aktualizacji statusu wywoływanej z frontendu.
- **Prawdziwe uwierzytelnianie w panelu kuriera** — obecnie jeden wspólny klucz
  dostępu w cookie; docelowo osobne konta kurierów (np. NextAuth) + logi zmian statusu.
- **Realne zdjęcia produktowe** — patrz sekcja 3.
- **RODO / polityka prywatności** — regulamin odsyła do osobnej Polityki
  Prywatności, której ta wersja nie zawiera.
- **Rate limiting / ochrona przed nadużyciami** na API `/api/checkout`.

---

## 5. Uwaga operacyjna i prawna (przeczytaj przed startem)

Serwis obsługuje obecnie wyłącznie Warszawę (`activeZone.customerZoneLabel`
w `src/lib/config.ts`) i wdraża model, w którym kurier kupuje towar poza
strefą lokalnej nocnej prohibicji na podstawie pełnomocnictwa klienta.
Kilka rzeczy wartych świadomości, zanim to uruchomisz komercyjnie:

1. **"Strefa bezpieczna" (miejscowość zakupu) zmienia się w czasie.** Liczba
   gmin wprowadzających lokalne uchwały o nocnej prohibicji rośnie z miesiąca
   na miesiąc — miejscowość bez ograniczeń dziś może wprowadzić własną
   uchwałę w każdej chwili (tak stało się np. z Piasecznem, które bywa
   podawane jako przykładowa "strefa wolna", a od stycznia 2026 samo objęte
   jest nocnym zakazem 22:00–6:00). `activeZone.purchaseZoneLabel` w
   `src/lib/config.ts` celowo nie ma na sztywno wpisanej lokalizacji — ale to
   Ty musisz ją ustawić i weryfikować cyklicznie, a nie jednorazowo przy starcie.
2. **To już jest obszar zainteresowania mediów i władz.** Dokładnie ten model
   (kurier/"alkotaksówka" kupujący poza strefą prohibicji) opisywany był
   w prasie w połowie 2026 r. jako zjawisko rosnące wokół Warszawy, z uwagami
   ze strony miasta i policji o traktowaniu go jako obchodzenia przepisów.
   Nie przesądza to nielegalności tego modelu — ale oznacza realne ryzyko
   regulacyjne i reputacyjne.
3. **Skonsultuj model prawny z prawnikiem przed startem** — dokładną treść
   pełnomocnictwa i regulaminu (szkic w `src/app/regulamin`), moment
   przejścia własności towaru, oraz zgodność z lokalną uchwałą rady gminy
   w wybranej "strefie zakupowej".
4. **Marka "po22" nie jest powiązana z żadną istniejącą siecią sklepów** —
   celowo nie sugerujemy w treściach żadnej afiliacji z realnymi, zastrzeżonymi
   markami convenience-store. Jeśli faktycznie nawiążesz taką współpracę,
   dodaj odpowiednie informacje o niej samodzielnie (i za zgodą partnera).
