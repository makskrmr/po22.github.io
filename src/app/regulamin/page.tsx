import { activeZone, brand } from "@/lib/config";

const sections = [
  {
    title: "§1 Postanowienia ogólne",
    items: [
      `Niniejszy regulamin określa zasady korzystania z serwisu ${brand.name} (dalej: „Serwis”), za pośrednictwem którego klienci mogą zlecać usługi kurierskie obejmujące dostawę produktów, w tym napojów alkoholowych, w godzinach nocnych.`,
      `${brand.name} świadczy wyłącznie usługi kurierskie oraz usługi pośrednictwa w zakupie towarów na podstawie pełnomocnictwa udzielonego przez klienta. ${brand.name} nie jest sprzedawcą napojów alkoholowych, nie posiada i nie musi posiadać zezwolenia na sprzedaż alkoholu, ponieważ takiej sprzedaży nie prowadzi.`,
      "Sprzedawcą towarów pozostaje każdorazowo punkt handlowy posiadający ważne zezwolenie (koncesję) na sprzedaż napojów alkoholowych, w którym kurier dokonuje zakupu w imieniu i na rzecz klienta."
    ]
  },
  {
    title: "§2 Definicje",
    items: [
      "Klient — osoba pełnoletnia składająca zamówienie w Serwisie.",
      "Kurier — osoba działająca na zlecenie Serwisu, realizująca zakup towarów w punkcie koncesjonowanym oraz ich dostawę do klienta.",
      `Strefa objęta ograniczeniem — obszar (np. ${activeZone.customerZoneLabel}), w którym na mocy lokalnej uchwały obowiązuje ograniczenie godzin sprzedaży napojów alkoholowych.`,
      "Punkt koncesjonowany — sklep lub inny punkt handlowy posiadający ważne zezwolenie na sprzedaż napojów alkoholowych, zlokalizowany poza strefą objętą ograniczeniem sprzedaży w danym czasie."
    ]
  },
  {
    title: "§3 Zawarcie umowy i udzielenie pełnomocnictwa",
    items: [
      "Złożenie zamówienia poprzez kliknięcie przycisku „Zamawiam i płacę” jest równoznaczne z zawarciem z Serwisem umowy o świadczenie usługi kurierskiej oraz z udzieleniem kurierowi jednorazowego pełnomocnictwa do dokonania zakupu wskazanych w zamówieniu towarów w imieniu i na rzecz klienta, w punkcie koncesjonowanym.",
      "Klient, opłacając zamówienie z góry, powierza Serwisowi środki pieniężne o charakterze celowym, przeznaczone wyłącznie na pokrycie ceny zakupu wskazanych towarów w punkcie koncesjonowanym oraz na opłacenie usługi transportu.",
      "Pełnomocnictwo, o którym mowa w niniejszym paragrafie, ma charakter jednorazowy, ograniczony do konkretnego, złożonego zamówienia, i wygasa z chwilą jego wykonania albo anulowania.",
      "Kurier dokonuje zakupu towarów we własnym imieniu w rozumieniu czynności faktycznej dokonywanej przy kasie punktu koncesjonowanego, lecz na rachunek i zgodnie z dyspozycją klienta, zgodnie z udzielonym pełnomocnictwem."
    ]
  },
  {
    title: "§4 Płatność",
    items: [
      "Warunkiem przyjęcia zamówienia do realizacji jest opłacenie przez klienta 100% wartości zamówienia z góry, za pośrednictwem dostępnych w Serwisie metod płatności online (BLIK lub karta płatnicza).",
      "Serwis nie oferuje możliwości zapłaty gotówką przy odbiorze towaru.",
      "W przypadku braku możliwości zrealizowania zamówienia z przyczyn leżących po stronie Serwisu (np. brak dostępności towaru w punkcie koncesjonowanym), wpłacone środki podlegają zwrotowi w całości."
    ]
  },
  {
    title: "§5 Realizacja zamówienia, dostawa i przejście własności",
    items: [
      "Po opłaceniu zamówienia kurier udaje się do punktu koncesjonowanego i dokonuje zakupu wskazanych towarów, działając jako pełnomocnik klienta.",
      "Towar staje się własnością klienta z chwilą jego zakupu przez kuriera przy kasie punktu koncesjonowanego — a nie z chwilą dostarczenia go pod adres klienta. Od tego momentu kurier przechowuje i transportuje towar stanowiący własność klienta.",
      "Orientacyjny czas dostawy podawany w Serwisie ma charakter szacunkowy i może ulec wydłużeniu z przyczyn niezależnych od Serwisu (natężenie ruchu, dostępność towaru, warunki atmosferyczne)."
    ]
  },
  {
    title: "§6 Weryfikacja wieku i wydanie towaru",
    items: [
      "Serwis przeznaczony jest wyłącznie dla osób, które ukończyły 18. rok życia. Sprzedaż i podawanie napojów alkoholowych osobom poniżej 18. roku życia jest zabronione.",
      "Kurier jest zobowiązany zweryfikować pełnoletność klienta na podstawie dokumentu tożsamości ze zdjęciem (dowód osobisty lub inny dokument potwierdzający wiek) bezpośrednio przy wydaniu zamówienia.",
      "W przypadku odmowy okazania dokumentu tożsamości, braku możliwości potwierdzenia pełnoletności lub uzasadnionego podejrzenia, że osoba odbierająca zamówienie jest nietrzeźwa, kurier ma obowiązek odmówić wydania towaru. W takim przypadku koszt usługi transportu oraz zakupionego towaru nie podlega zwrotowi, a towar jest zwracany do punktu koncesjonowanego lub utylizowany zgodnie z procedurą wewnętrzną Serwisu.",
      "Zamówienie może zostać odebrane wyłącznie przez osobę wskazaną jako klient lub inną pełnoletnią osobę obecną pod wskazanym adresem, która przejdzie pozytywnie weryfikację wieku."
    ]
  },
  {
    title: "§7 Reklamacje i odstąpienie od umowy",
    items: [
      "Reklamacje dotyczące usługi kurierskiej lub zakupionego towaru można zgłaszać za pośrednictwem danych kontaktowych wskazanych w Serwisie.",
      "Z uwagi na charakter usługi (towar zakupiony na indywidualne zamówienie i niezwłocznie dostarczany), prawo odstąpienia od umowy zawartej na odległość nie przysługuje po dokonaniu przez kuriera zakupu towaru w punkcie koncesjonowanym, zgodnie z właściwymi przepisami o prawach konsumenta."
    ]
  },
  {
    title: "§8 Dane osobowe",
    items: [
      "Administratorem danych osobowych klientów jest Serwis. Dane przetwarzane są w celu realizacji zamówienia, w tym weryfikacji wieku, oraz w celach wynikających z obowiązków prawnych i księgowych.",
      "Szczegółowe zasady przetwarzania danych osobowych określa odrębna Polityka Prywatności."
    ]
  },
  {
    title: "§9 Postanowienia końcowe",
    items: [
      "Serwis zastrzega sobie prawo do odmowy przyjęcia zamówienia w uzasadnionych przypadkach, w tym w razie wątpliwości co do pełnoletności klienta lub prawdziwości podanych danych.",
      "W sprawach nieuregulowanych niniejszym regulaminem zastosowanie mają przepisy prawa polskiego, w tym Kodeksu cywilnego oraz ustawy o wychowaniu w trzeźwości i przeciwdziałaniu alkoholizmowi.",
      "Regulamin może ulec zmianie; zamówienia złożone przed wejściem w życie zmian realizowane są na dotychczasowych zasadach."
    ]
  }
];

export default function RegulaminPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="eyebrow mb-2">Dokument prawny</p>
      <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        Regulamin świadczenia usług
      </h1>
      <p className="mt-4 text-sm text-muted">
        Ten regulamin to szablon opisujący model prawny usługi opartej na pełnomocnictwie i wymaga
        indywidualnego przeglądu prawnego przed publikacją — patrz uwaga na końcu strony.
      </p>

      <div className="mt-10 space-y-10">
        {sections.map((s) => (
          <section key={s.title}>
            <h2 className="text-lg font-bold text-ink">{s.title}</h2>
            <ol className="mt-3 list-decimal space-y-2.5 pl-5 text-sm leading-relaxed text-muted">
              {s.items.map((it, i) => (
                <li key={i}>{it}</li>
              ))}
            </ol>
          </section>
        ))}
      </div>

      <div className="card mt-12 space-y-2 border-ember/30 bg-ember/5 p-6">
        <h2 className="text-sm font-bold text-ink">Uwaga dot. tego dokumentu</h2>
        <p className="text-sm leading-relaxed text-muted">
          Powyższy tekst to punkt wyjścia do dalszej pracy, nie gotowy regulamin do wdrożenia.
          Lokalne uchwały o nocnej prohibicji oraz podejście organów do modelu opartego na
          pełnomocnictwie zmieniają się dynamicznie — przed uruchomieniem usługi ten dokument
          oraz cały model operacyjny powinien zostać zweryfikowany przez prawnika specjalizującego
          się w prawie handlowym i ustawie o wychowaniu w trzeźwości.
        </p>
      </div>
    </div>
  );
}
