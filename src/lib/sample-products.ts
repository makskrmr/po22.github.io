export type SampleProduct = {
  name: string;
  brand: string;
  slug: string;
  category: "PIWO" | "WODKA" | "WINO" | "PRZEKASKI" | "NAPOJE_BEZALKOHOLOWE";
  volumeMl?: number;
  weightG?: number;
  abv?: number;
  country?: string;
  priceCents: number;
  imageUrl: string;
  description?: string;
  featured?: boolean;
};

// Uwaga: to są generyczne, przykładowe pozycje demonstracyjne z fikcyjnymi
// markami — celowo bez odwołań do istniejących, zastrzeżonych marek
// alkoholi (żeby uniknąć naruszenia cudzych znaków towarowych). Podmień na
// realny asortyment, prawdziwe marki (z odpowiednimi licencjami) i zdjęcia
// produktowe przed uruchomieniem produkcyjnym.
export const sampleProducts: SampleProduct[] = [
  {
    "name": "Corona Extra",
    "brand": "Corona",
    "slug": "corona-extra-330",
    "category": "PIWO",
    "volumeMl": 330,
    "abv": 4.5,
    "country": "Meksyk",
    "priceCents": 849,
    "imageUrl": "/products/corona.png",
    "description": "Lekki, meksykański lager. Najlepiej smakuje mocno schłodzony, z cząstką limonki.",
    "featured": true
  },
  {
    "name": "Garage Hard Berry",
    "brand": "Garage",
    "slug": "garage-hard-berry-400",
    "category": "PIWO",
    "volumeMl": 400,
    "abv": 4.6,
    "country": "Polska",
    "priceCents": 849,
    "imageUrl": "/products/garage.png",
    "description": "Orzeźwiający napój piwny o wyraźnym, słodko-kwaśnym smaku jagody."
  },
  {
    "name": "Łomża Jasne",
    "brand": "Łomża",
    "slug": "lomza-jasne-500",
    "category": "PIWO",
    "volumeMl": 500,
    "abv": 5.7,
    "country": "Polska",
    "priceCents": 549,
    "imageUrl": "/products/lomza.png",
    "description": "Klasyczne piwo z regionalnego browaru, wyróżniające się pełnym, chmielowym smakiem.",
    "featured": true
  },
  {
    "name": "Stock Prestige",
    "brand": "Stock",
    "slug": "stock-prestige-czysta-500",
    "category": "WODKA",
    "volumeMl": 500,
    "abv": 40,
    "country": "Polska",
    "priceCents": 4599,
    "imageUrl": "/products/stock.png",
    "description": "Sześciokrotnie destylowana wódka premium o niezwykle łagodnym smaku.",
    "featured": true
  },
  {
    "name": "Soplica Cytrynowa",
    "brand": "Soplica",
    "slug": "soplica-cytrynowa-500",
    "category": "WODKA",
    "volumeMl": 500,
    "abv": 28,
    "country": "Polska",
    "priceCents": 4199,
    "imageUrl": "/products/soplica.png",
    "description": "Słodko-kwaśna, owocowa nalewka z nutą dojrzałych cytryn."
  },
  {
    "name": "Carlo Rossi Cabernet Sauvignon",
    "brand": "Carlo Rossi",
    "slug": "carlo-rossi-cabernet-sauvignon-750",
    "category": "WINO",
    "volumeMl": 750,
    "abv": 11.5,
    "country": "USA",
    "priceCents": 3599,
    "imageUrl": "/products/carlo.png",
    "description": "Czerwone, wytrawne wino o aromacie ciemnych owoców i czekolady.",
    "featured": true
  },
  {
    "name": "Jacob's Creek Chardonnay Pinot Noir",
    "brand": "Jacob's Creek",
    "slug": "jacobs-creek-chardonnay-750",
    "category": "WINO",
    "volumeMl": 750,
    "abv": 12.5,
    "country": "Australia",
    "priceCents": 4699,
    "imageUrl": "/products/jacob.png",
    "description": "Białe wino musujące wytrawne."
  },
  {
    "name": "Martini Prosecco",
    "brand": "Martini",
    "slug": "martini-prosecco-750",
    "category": "WINO",
    "volumeMl": 750,
    "abv": 11.5,
    "country": "Włochy",
    "priceCents": 5799,
    "imageUrl": "/products/martini.png",
    "description": "Wytrawne wino musujące o aromatach jabłka i tymianku, idealne na toast."
  },
  {
    "name": "Lay's Solone",
    "brand": "Lay's",
    "slug": "lays-solone-130",
    "category": "PRZEKASKI",
    "weightG": 130,
    "country": "Polska",
    "priceCents": 949,
    "imageUrl": "/products/lays.png",
    "description": "Złociste, chrupiące chipsy ziemniaczane z dodatkiem soli.",
    "featured": true
  },
  {
    "name": "Felix Orzeszki Ziemne Solone",
    "brand": "Felix",
    "slug": "felix-orzeszki-solone-140",
    "category": "PRZEKASKI",
    "weightG": 140,
    "country": "Polska",
    "priceCents": 1299,
    "imageUrl": "/products/felix.png",
    "description": "Starannie wyselekcjonowane, prażone i solone orzeszki ziemne."
  },
  {
    "name": "Paluszki Lajkonik Słone",
    "brand": "Lajkonik",
    "slug": "lajkonik-paluszki-slone-300",
    "category": "PRZEKASKI",
    "weightG": 300,
    "country": "Polska",
    "priceCents": 899,
    "imageUrl": "/products/lajkonik.png",
    "description": "Tradycyjnie wypiekane, chrupiące paluszki z solą."
  },
  {
    "name": "Żywiec Zdrój Mocny Gaz",
    "brand": "Żywiec Zdrój",
    "slug": "zywiec-zdroj-mocny-gaz-500",
    "category": "NAPOJE_BEZALKOHOLOWE",
    "volumeMl": 500,
    "country": "Polska",
    "priceCents": 399,
    "imageUrl": "/products/mocny.png",
    "description": "Krystalicznie czysta woda z mocnym orzeźwiającym gazem."
  },
  {
    "name": "Coca-Cola Original Taste",
    "brand": "Coca-Cola",
    "slug": "coca-cola-500",
    "category": "NAPOJE_BEZALKOHOLOWE",
    "volumeMl": 500,
    "country": "Polska",
    "priceCents": 649,
    "imageUrl": "/products/cola.png",
    "description": "Kultowy napój gazowany o niepodrabialnym smaku.",
    "featured": true
  },
  {
    "name": "Red Bull Energy Drink",
    "brand": "Red Bull",
    "slug": "red-bull-energetyk-250",
    "category": "NAPOJE_BEZALKOHOLOWE",
    "volumeMl": 250,
    "country": "Austria",
    "priceCents": 899,
    "imageUrl": "/products/red.png",
    "description": "Dodaje skrzydeł — popularny energetyk z tauryną i kofeiną."
  }
]
