import type { Dictionary } from "./en";

/**
 * Bosnian. Typed against the English dictionary, so a forgotten key fails the
 * build instead of leaving a blank on the page.
 *
 * Terminology kept consistent: kreator, brend, publika, pratioci, podjela
 * prihoda, lansiranje. Bosnian forms — sedmica not tjedan, hiljada not
 * tisuća, zavisi not ovisi, niko not nitko, bijela tehnika not kućanski.
 *
 * Watch for calques. "Isporučiti softver" is logistics language for shipping
 * goods; software gets napraviti or razviti. "Trgovinski proizvod" is
 * merchandise, not commerce software. And translating "unglamorous" as
 * "neefektan" says inefficient, which is close to the opposite.
 */
export const bs: Dictionary = {
  locale: "bs",
  htmlLang: "bs",
  label: "BHS",

  site: {
    role: "Rast i izgradnja za kreatore",
    tagline: "Pretvaram kreatore u brendove.",
    description:
      "MintedScale pretvara publiku kreatora u brendove, proizvode i biznise. Strategija, proizvod i tehnologija od jednog čovjeka — uz podjelu prihoda, tako da unaprijed ne plaćaš ništa.",
  },

  nav: ["Rad", "Izgradnja", "AI sistem", "Kalkulator", "Koncepti"],
  applyCta: "Prijavi se",
  langLabel: "Jezik",
  menuOpen: "Otvori meni",
  menuClose: "Zatvori meni",
  skipToContent: "Preskoči na sadržaj",

  hero: {
    headline: ["Tvoja publika je", "više od pratilaca."],
    sub: "Pretvaram pažnju u brendove, proizvode i biznise — gradi ih i lansira jedan čovjek, uz podjelu prihoda. Unaprijed ne plaćaš ništa.",
    primaryCta: "Izgradi moj brend",
    secondaryCta: "Vidi kako radi",
    videoLabel: "Kako sve funkcioniše",
    bar: [
      { value: "€0", label: "Unaprijed" },
      { value: "Podjela", label: "Zarađujem kad ti zaradiš" },
      { value: "8+ god", label: "Gradnje proizvoda" },
    ],
    earnings: {
      lead: "Koliko kreator sa 250K zaradi na lansiranju",
      inputs: "250.000 pratilaca · 3% stopa angažmana · proizvod od €125",
      cta: "Izračunaj za sebe",
    },
    pill: { lead: "Radio sam za", companies: "kompanije", tail: "8+ godina iskustva" },
  },

  work: {
    eyebrow: "Dosadašnji rad",
    index: "01",
    headline: ["Rađeno za", "prave kompanije."],
    body: "Osam godina platformi, aplikacija, web prodavnica i sistema koji ih drže u pogonu. Brendovi za kreatore su novo poglavlje — svaku kompaniju ispod možeš otvoriti i provjeriti.",
    selectLabel: "Izaberi projekat",
    visitLabel: "Otvori sajt",
    sectorLabel: "Sektor",
    placeLabel: "Sjedište",
    doesLabel: "Čime se bave",
    builtLabel: "Šta sam izgradio",
    builtPending: "Opis projekta slijedi — kompanija je stvarna, tekst još nije napisan.",
    items: [
      {
        sector: "Poslovne IT usluge",
        place: "Melbourne, Australija",
        does: "Održavanje IT infrastrukture, sigurnost i podrška za mala i srednja preduzeća.",
        built: [
          "Web platforma i mobilna aplikacija",
          "Sistem za IT tikete",
          "Cybersecurity",
        ],
      },
      {
        sector: "Softverski proizvod",
        place: "Australija",
        does: "Kompanija koja razvija vlastitu aplikaciju.",
        built: [
          "Web platforma i mobilna aplikacija",
          "Njihov vlastiti proizvod",
        ],
      },
      {
        sector: "Obuka i licenciranje",
        place: "Viktorija, Australija",
        does: "Registrovana obrazovna ustanova za licence za teška vozila, viljuškare i građevinske mašine, na šest lokacija.",
        built: [
          "Web platforma i mobilna aplikacija",
          "Za licenciranje teških vozila i mašina",
        ],
      },
      {
        sector: "Servis na terenu",
        place: "Cijela Australija",
        does: "Servis bijele tehnike za domove i firme, online zakazivanje i izlasci na teren širom zemlje.",
        built: [
          "Web platforma i mobilna aplikacija",
          "Za servis na terenu širom zemlje",
        ],
      },
    ],
  },

  studio: {
    stats: [
      { value: "8+", label: "Godina gradnje proizvoda", note: "Softver i online prodaja" },
      { value: "€0", label: "Unaprijed za početak", note: "Ništa se ne plaća unaprijed" },
      { value: "Podjela", label: "Zarađujem kad ti zaradiš", note: "Nema rezultata, nema naknade" },
      { value: "4", label: "Discipline, jedan čovjek", note: "Brend · Proizvod · Rast · Tehnologija" },
    ],
    portraitAlt: "Anel Kujović, osnivač MintedScale-a",
    portraitSlot: "Mjesto za fotografiju",
    note: {
      lead: "Ja sam Anel. Preko osam godina radim softver i sisteme za online prodaju — platforme, aplikacije, web prodavnice i naplatu. Onu infrastrukturu o kojoj niko ne priča, a bez koje biznis ne radi.",
      body: "MintedScale je to isto, samo usmjereno na kreatore. Većina onih koji ti nude da izgrade brend su marketingaši koji ne znaju napraviti softver — strategija stigne, a proizvod nikad. Ja proizvod i napravim.",
      offer:
        "Brendovi za kreatore su mi novi i radije ću to reći nego izmisliti listu klijenata. Zato partneri unaprijed ne plaćaju ništa: ja gradim, ti lansiraš, a ja uzimam dio onoga što zaradi. Ako ne zaradi ništa, ne zarađujem ni ja.",
      signature: "Anel Kujović · Osnivač",
    },
    clientsLabel: "Dosadašnji rad na proizvodima",
    clientsCaveat:
      "Softver i sistemi za prodaju koje sam napravio za ove kompanije. Brendovi kreatora su novo poglavlje — ti rezultati dolaze ovdje kada se dogode, ne prije.",
    followLabel: "Prati kako gradim",
  },

  diagnosis: {
    eyebrow: "Problem",
    index: "02",
    headline: ["Kreatori imaju pažnju.", "Rijetki grade brend."],
    body: "Milioni kreatora svaki dan grade publiku. Skoro ništa od te pažnje ne postane nešto njihovo. Pratioce samo iznajmljuješ — čim prestaneš objavljivati, prestaje i zarada. Brend je imovina. Vrijedi i dok spavaš, i može se prodati.",
    costLabel: "Cijena",
    faults: [
      {
        code: "01",
        title: "Nema jasne strategije brenda",
        body: "Publika zna tvoje lice, ali ne i za šta se zalažeš. Bez pozicije svaka saradnja izgleda isto i nijedna se ne nadograđuje na prethodnu.",
        state: "Nedefinisano",
        loss: "Cijenu određuje sponzor",
      },
      {
        code: "02",
        title: "Nema sistema proizvoda",
        body: "Jedno lansiranje, pa tišina. Nema kataloga, nema cjenovnih nivoa, nema lanca nabavke — pa prihod zavisi od toga hoćeš li objaviti i sutra.",
        state: "Neizgrađeno",
        loss: "€0 između objava",
      },
      {
        code: "03",
        title: "Nema održivog poslovnog modela",
        body: "Prihod je zamjena tvojih sati za sponzorske ugovore. Ništa ne radi bez tebe u kadru, pa je granica tvoj kalendar.",
        state: "Nije tvoje",
        loss: "Granica = tvoje vrijeme",
      },
    ],
  },

  method: {
    eyebrow: "Rast i izgradnja",
    index: "03",
    headline: ["Od kreatora", "do brenda."],
    body: "Jedan niz koraka, odrađen po redu. Svaka faza proizvede nešto što je tvoje prije nego počne sljedeća.",
    cta: "Počni graditi svoj brend",
    steps: [
      {
        n: "01",
        title: "Otkrivanje",
        body: "Razumijem tvoju publiku, identitet i prilike.",
        detail:
          "Provlačim tvoju publiku kroz sistem: ko su, šta već kupuju, gdje je potražnja dovoljno jaka da se na nju može postaviti cijena. Rezultat je teza o pozicioniranju, a ne kolaž slika.",
        output: "Teza o publici · Mapa prilika",
        time: "Sedmica 1–2",
      },
      {
        n: "02",
        title: "Gradnja",
        body: "Kreiram identitet brenda, pozicioniranje i strategiju.",
        detail:
          "Ime, znak, ton i priča zbog koje cijena ima smisla. Građeno tako da preživi i kad tvoje lice izađe iz kadra.",
        output: "Sistem identiteta · Knjiga brenda",
        time: "Sedmica 3–6",
      },
      {
        n: "03",
        title: "Lansiranje",
        body: "Razvijam proizvode, ponude i digitalnu imovinu.",
        detail:
          "Proizvod, cijene, pakovanje, prodavnica i samo lansiranje — poredano uz tvoj kalendar objava, da pažnja padne na nešto što se može kupiti.",
        output: "Linija proizvoda · Prodavnica · Plan lansiranja",
        time: "Sedmica 7–12",
      },
      {
        n: "04",
        title: "Rast",
        body: "Pretvaram tvoj brend u pravi biznis.",
        detail:
          "Zadržavanje kupaca, marža, operacije i sistemi koji kompaniji omogućavaju da raste brže od tvog rasporeda objavljivanja.",
        output: "Operativni model · Sistemi rasta",
        time: "Mjesec 4+",
      },
    ],
  },

  engine: {
    eyebrow: "Vlastiti razvoj",
    index: "04",
    headline: ["Izgradio sam vlastiti", "AI sistem za monetizaciju."],
    body: "Većina studija nagađa šta će tvoja publika kupiti, pa ti naplati nagađanje. Ja sam napravio softver koji prvo pročita publiku — pa se proizvod bira po dokazima, a ne po ukusu.",
    serif: "Nagađanje je ono što košta. Njega sam uklonio.",
    videoLabel: "Unutar sistema",
    asideBody:
      "Svaka saradnja počinje analizom iz sistema. Rezultat vidiš prije nego se na išta obavežeš.",
    asideCta: "Analiziraj moju publiku",
    appCaption: "Rezultat analize",
    appNote: "Projekcija na osnovu tvojih brojki — nije zarađen prihod.",
    producesLabel: "Rezultat",
    modules: [
      {
        code: "01",
        title: "Čitanje publike",
        body: "Čita tvoje komentare, poruke, vrijeme gledanja i mrežu pratilaca, pa grupiše ono što tvoja publika zaista želi kupiti.",
        metric: "Mapa potražnje",
      },
      {
        code: "02",
        title: "Sinteza ponude",
        body: "Generiše i ocjenjuje moguće proizvode prema jačini potražnje, cijeni koju publika prihvata i tome koliko je svaki težak za napraviti.",
        metric: "Rangirane ponude",
      },
      {
        code: "03",
        title: "Traženje cijene",
        body: "Modelira tvoje nivoe — ulazni, glavni i premium — u poređenju sa sličnim lansiranjima u tvojoj niši.",
        metric: "Tri nivoa cijena",
      },
      {
        code: "04",
        title: "Simulacija lansiranja",
        body: "Projektuje slijed lansiranja prije nego izađe ijedna objava, da znam šta očekivati i gdje puca.",
        metric: "Projekcija na 90 dana",
      },
    ],
  },

  calculator: {
    eyebrow: "Kalkulator prihoda",
    index: "05",
    headline: ["Koliko tvoja publika", "zaista vrijedi?"],
    body: "Pomjeri klizače. Računica je prikazana u cijelosti — bez crne kutije i bez naduvanih obećanja.",
    audienceLabel: "Tvoja publika",
    followersLabel: "Pratioci",
    engagementLabel: "Stopa angažmana",
    engagementHint:
      "Koliki dio tvojih pratilaca zaista lajkuje, komentariše ili gleda — nije tvoj udio u prihodu",
    priceLabel: "Cijena proizvoda",
    leversLabel: "Šta pomjera ovu cifru",
    projectedLabel: "Projekcija prvog lansiranja",
    yearLabel: "Potencijal za 12 mjeseci",
    engagedRow: "Angažovana publika",
    conversionRow: "Konverzija lansiranja",
    conversionValue: "angažovanih",
    buyersRow: "Očekivani kupci",
    priceRow: "Cijena po prodaji",
    cta: "Želim ovaj prihod",
    levers: [
      "Koliko ponuda odgovara onome što tvoja publika već kupuje",
      "Imaš li vlastitu listu e-pošte ili samo iznajmljuješ platformu",
      "Nivoi cijena — ulazni proizvod podiže glavni",
      "Raspored lansiranja uz tvoj kalendar objava",
    ],
    disclaimer:
      "Model, a ne obećanje. Primjenjuje stopu konverzije lansiranja na tvoju angažovanu publiku — tvoja niša, ponuda i kvalitet liste pomjeraju je u oba smjera. Računicu prikazujem da je možeš provjeriti i osporiti.",
  },

  concepts: {
    eyebrow: "Koncepti",
    index: "06",
    headline: ["Prvo na papiru,", "pa tek onda uživo."],
    body: "Tri kreatora s kojima bih rado radio i tačno ono što bih za svakog napravio. Ovo su planovi, a ne bivši klijenti — pročitaj ih da procijeniš razmišljanje, jer razmišljanje je ono što unajmljuješ.",
    disclaimer:
      "Koncepti. Ilustrativni kreatori, stvarna metodologija. Cifre su projekcije iz modela u mom kalkulatoru, a ne rezultati — MintedScale tek prima prve partnere.",
    cta: "Zatraži svoj koncept",
    conceptWord: "Koncept",
    beforeLabel: "Gdje su sada",
    afterLabel: "Šta bih izgradio",
    projectedLabel: "Projekcija prvog lansiranja",
    audienceRow: "Publika",
    engagedRow: "Angažovani",
    buyersRow: "Kupci",
    priceRow: "Cijena",
    ladderLabel: "Nivoi cijena",
    modelLabel: "Poslovni model",
    horizonLabel: "Rok izgradnje",
    items: [
      {
        handle: "Kreator u fitnesu",
        field: "Trening i oporavak",
        beforeSummary:
          "Četiri godine svakodnevnog sadržaja o treningu. Prihod od pojedinačnih sponzorskih ugovora, dogovorenih preko poruka, s cijenom određenom napamet.",
        beforePoints: [
          "Nema vlastitog proizvoda",
          "Cijenu određuje sponzor",
          "Nula prihoda između objava",
        ],
        line: "Oporavak i hidratacija",
        afterSummary:
          "Brend za oporavak s vlastitim stavom, prodaja direktno, uz pretplatu koja se naplaćuje bez obzira objavljuje li ona ili ne.",
        deliverables: [
          "Sistem identiteta i pakovanje",
          "Vlastita prodavnica na Shopifyju",
          "Linija od 9 proizvoda",
          "Pretplata i zadržavanje kupaca",
        ],
        ladderTiers: ["Ulazni", "Glavni", "Paket"],
        model: "Pretplata direktno kupcu · Veleprodaja",
        horizon: "11 mjeseci do pune linije",
      },
      {
        handle: "Kreator u finansijama",
        field: "Lične finansije",
        beforeSummary:
          "Objašnjava novac milionu ljudi. Zarađuje preko afilijantskih linkova ka proizvodima koje nije napravio niti kontroliše.",
        beforePoints: [
          "Publika mu vjeruje, a kupuje drugdje",
          "Ne može diktirati cijenu",
          "Prihod zavisi od platforme",
        ],
        line: "Finansijska edukacija",
        afterSummary:
          "Škola s programom, kalendarom generacija i softverom — naplaćena kao edukacija, a ne kao klik na afilijantski link.",
        deliverables: [
          "Nastavni program i struktura generacija",
          "Web aplikacija — praćenje i lekcije",
          "Program certifikacije",
          "Licenciranje kompanijama",
        ],
        ladderTiers: ["Ulazni", "Generacija", "Licenca"],
        model: "Školarina po generaciji · Pretplata na softver",
        horizon: "14 mjeseci do licenciranja",
      },
      {
        handle: "Kreator u dizajnu",
        field: "Enterijeri i dizajn",
        beforeSummary:
          "Dugi videi o enterijerima s odanom publikom. Prihod je udio od reklama — puno pregleda, mala marža.",
        beforePoints: [
          "Prihod vezan za CPM",
          "Nema fizičkog proizvoda",
          "Ima ukus, ali ništa uz njega",
        ],
        line: "Predmeti i rasvjeta",
        afterSummary:
          "Dizajnerska kuća koja proizvodi pod njenim imenom, uz licencne ugovore koji plaćaju i bez ijedne objave.",
        deliverables: [
          "Identitet kuće i likovna režija",
          "Prva kolekcija — 14 komada",
          "Proizvodnja i struktura licenciranja",
          "Kanal prodaje i izložbeni prostor",
        ],
        ladderTiers: ["Grafika", "Predmet", "Rasvjeta"],
        model: "Marža na proizvod · Licencne naknade",
        horizon: "16 mjeseci do prve kolekcije",
      },
    ],
  },

  films: {
    eyebrow: "Filmovi partnera",
    index: "07",
    headline: ["Jesi li ti", "sljedeći?"],
    body: "Kada partner lansira, njegov film ide ovdje — šta sam izgradio, koliko zarađuje, njegovim riječima. Rezervisano, a ne izmišljeno.",
    cta: "Budi prvi",
    slotLabel: "Jesi li ti sljedeći?",
    status: "Slobodno",
    frameWord: "Kadar",
  },

  faq: {
    eyebrow: "Pitanja",
    index: "08",
    headline: ["Prije nego se", "prijaviš."],
    items: [
      {
        q: "Koliko košta?",
        a: "Unaprijed ništa. Radim uz podjelu prihoda: ja gradim brend, proizvod i tehnologiju o svom trošku i uzimam dio onoga što zaradi. Ako ne zaradi ništa, ne zarađujem ni ja. Procenat zavisi od toga koliko toga gradimo, pa ga postavljamo zajedno na pozivu — i ide u pisani ugovor, vremenski ograničen, prije nego bilo šta počne. Ne potpisuješ nikakav udio u svojoj firmi.",
      },
      {
        q: "Nov si u brendovima za kreatore. Zašto bih riskirao?",
        a: "Zbog načina na koji je postavljena cijena, finansijski rizik ne nosiš ti nego ja. Rad na proizvodima nije nov: osam godina platformi, aplikacija i prodavnica za kompanije poput Accelit IT, Puzzles IT, TDT Training i Nationwide Appliance Repairs. Novo je to što to primjenjujem na brendove kreatora, i radije ću to reći otvoreno nego izmisliti listu kreatora. Počni besplatnom analizom i procijeni rad prije nego se na išta obavežeš.",
      },
      {
        q: "Kolika mi publika treba?",
        a: "Nema čvrste granice, ali angažman je daleko važniji od broja pratilaca. Publika od 30 hiljada koja komentariše i kupuje vrijedi više od 500 hiljada koji samo prođu pored. Ako brojke još ne opravdavaju izgradnju, reći ću ti to otvoreno umjesto da uzmem posao.",
      },
      {
        q: "Koliko traje dok nešto ne bude uživo?",
        a: "Prvi plan u roku od 48 sati od poziva. Digitalni proizvod je izgradnja od 8 do 12 sedmica; fizička linija traje duže, jer proizvodnja traje duže. Cijeli raspored dobiješ prije nego počnemo, a ne poslije.",
      },
      {
        q: "Već imam proizvod. Možeš li i dalje pomoći?",
        a: "Često je to i bolja polazna tačka. Analiziram šta postoji, popravim pozicioniranje i cijene, pa oko toga izgradim sistem umjesto da krećemo od nule.",
      },
      {
        q: "Ko je vlasnik brenda?",
        a: "Ti — ime, identitet, prodavnica, lista kupaca, sve, na tvoje ime od prvog dana. Podjela prihoda je udio u prihodu, a ne u vlasništvu.",
      },
    ],
  },

  application: {
    eyebrow: "Prijava",
    index: "09",
    headline: ["Spreman da svoje ime", "pretvoriš u brend?"],
    body: "Ako si kreator i želiš izgraditi nešto veće od sadržaja, hajde da razgovaramo. Bez plaćanja unaprijed — zarađujem kad ti zaradiš.",
    writeToUs: "Ili mi piši",
    terms: [
      "Ništa se ne plaća unaprijed — zarađujem kad ti zaradiš.",
      "Brend, proizvod i lista kupaca su tvoji.",
      "Svaku prijavu čitam ja, a ne robot.",
      "Odgovor očekuj u roku od dva radna dana.",
    ],
  },

  console: {
    header: "Privatne konsultacije",
    confidential: "Povjerljivo",
    tablistLabel: "Kako do mene",
    callTab: "Zakaži poziv",
    callNote: "45 minuta, sa mnom",
    messageTab: "Pošalji poruku",
    messageNote: "Odgovaram u roku od dva dana",
    stepDay: "Izaberi dan",
    stepTime: "Izaberi vrijeme",
    stepAbout: "Reci mi o sebi",
    loadingSlots: "Učitavanje mog kalendara",
    slotsError: "Kalendar nije dostupan.",
    tryAgain: "Pokušaj ponovo",
    orMessage: "ili mi radije pošalji poruku.",
    noSlots: "Trenutno nema slobodnih termina — pošalji poruku pa ću napraviti mjesta.",
    pickDayFirst: "Prvo izaberi dan.",
    provisional: "Termini su privremeni dok ih ne potvrdim.",
    minutes: "min",
    privacyCall: "Tvoji podaci dolaze direktno meni. Ništa se ne dijeli dalje.",
    privacyMessage: "Šalje se na {email}. Ništa se ne dijeli dalje.",
    submitCall: "Potvrdi moj poziv",
    submitMessage: "Pošalji prijavu",
    sending: "Šaljem",
    preferGoogle: "Više voliš Google?",
    openAppointments: "Otvori moju stranicu za zakazivanje",
    fields: {
      name: "Ime i prezime",
      namePlaceholder: "Lena Ruiz",
      email: "E-pošta",
      emailPlaceholder: "ti@email.com",
      platform: "Glavna platforma",
      select: "Izaberi",
      handle: "Korisničko ime",
      handlePlaceholder: "tvojeime",
      followers: "Pratioci",
      followersHint: "120000 ili 120k",
      followersPlaceholder: "412000",
      ideaCall: "Šta želiš izgraditi?",
      ideaMessage: "Poruka",
      ideaPlaceholder: "Šta radiš, ko te prati i kakav biznis želiš s druge strane toga.",
    },
    done: {
      received: "Prijava primljena",
      thanks: "Hvala. Javit ću ti se uskoro.",
      yourCall: "Tvoj poziv",
      joining: "Podaci za poziv",
      meetLink: "Google Meet link",
      sentToEmail: "Poslano na tvoju e-poštu",
      quote: "Navedi {ref} ako mi trebaš pisati prije toga —",
    },
    errors: {
      generic: "Nešto je pošlo po zlu. Pokušaj ponovo.",
      unreachable: "Veza nije uspjela. Piši mi direktno na {email}.",
      checkFields: "Provjeri označena polja.",
      slotTaken: "Taj termin je upravo zauzet. Izaberi drugi.",
      slotGone: "Više nije dostupno.",
      tooMany: "Previše pokušaja. Pokušaj ponovo za koji trenutak.",
      malformed: "Neispravan zahtjev.",
      sendFailed: "Nije poslano. Piši direktno na {email}.",
      name: "Upiši ime i prezime.",
      nameLong: "To ime je predugo.",
      emailMissing: "Upiši adresu e-pošte.",
      emailInvalid: "Ta adresa e-pošte ne izgleda ispravno.",
      emailLong: "Ta adresa e-pošte je predugačka.",
      platformMissing: "Izaberi platformu.",
      platformInvalid: "Izaberi platformu s liste.",
      handle: "Upiši korisničko ime.",
      handleLong: "To korisničko ime je predugo.",
      followers: "Upiši broj, npr. 120000 ili 120k.",
      followersUnreal: "Upiši realan broj pratilaca.",
      idea: "Reci mi malo više — barem jednu rečenicu.",
      ideaLong: "Skrati na ispod 2.000 znakova.",
      slotMissing: "Izaberi vrijeme za poziv.",
      slotInvalid: "To vrijeme nije ispravno.",
      slotPast: "To vrijeme je već prošlo.",
    },
    success: {
      call: "Tvoj termin je rezervisan.",
      message: "Hvala. Javit ću ti se uskoro.",
    },
  },

  finalCta: {
    eyebrow: "Sada primam partnere",
    headline: ["Tvoje ime može postati", "brend."],
    body: "Donesi publiku i apetit — ja donosim strategiju, proizvod, tehnologiju i lansiranje. Unaprijed se ne plaća ništa.",
    primary: "Počni graditi",
    secondary: "Piši mi",
  },

  footer: {
    studio: "Sekcije",
    contact: "Kontakt",
    apply: "Prijavi se",
  },

  video: { reserved: "Mjesto za video", play: "Pusti" },
};
