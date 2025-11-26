
# Eesti Palgaturu Analüüs

## Eesti Keskmise Palga Trendid

Veebirakendus, mis võimaldab kasutajal valida tegevusala ning näha:
- viimase nelja aasta keskmisi brutokuupalku Statistikaameti API-st
- automaatselt genereeritud trendi kokkuvõtet (Groq LLaMA 3.1 abil)
- lihtsat ja kasutajasõbralikku UI-d

Rakendus on loodud Next.js 16, React 19 ja HeroUI komponentidega.

---

## Funktsionaalsus
### 1. Tegevusala valimine
Kasutaja valib dropdownist tegevusala (nt Toiduainete Tootmine)

### 2. Reaalajas Statistikaameti API päring
Rakendus teeb päringu:
Query:<br />
-*Näitaja*: GR_W_AVG (keskmine brutokuupalk)<br />
-*Tegevusala*: valitud kood (nt J63)<br />

### 3. Palganumbrite kuvamine
Kuvatakse:
- 2021
- 2022
- 2023
- 2024 <br />
Koos vastavate palkadega.

### 4. AI-põhine kokkuvõte
Rakendus loob:
- palgatrendi analüüsi
- prognoosi järgmisteks aastateks
- soovituse palgatõusu saavutamiseks

AI vastab *eesti keeles ja struktureeritult*

## Paigaldamine

### 1. Klooni projekt
```bash
git clone https://github.com/t6nislille/Salary-Market-Analysis.git
```

### 2. Installi dependencyd
```bash
npm install
```

### 3. Lisa `.env` fail
```bash
STAT_API_URL=""
GROQ_API_KEY=""
```

### 4. Käivita arenduskeskond
```bash
npm run dev
```

### 5. Ava veebibrauseris
```bash
http://localhost:3000
```

## Muutujad
AI kokkuvõtte funktsiooniks peab määrama järgmised muutujad:

`Projekt EI sisalda turvakaalutlustel API võtmeid!`
```bash
STAT_API_URL=https://andmed.stat.ee/api/v1/et/stat/PA103
GROQ_API_KEY= `Sisestage enda võti`
```

---

## Tehnoloogiad

| Tehnoloogia | Kasutus |
|------------|---------|
| **Next.js 16** | App routing, API route’id |
| **React 19** | Komponentide loogika |
| **HeroUI** | Dropdownid ja UI komponendid |
| **TypeScript** | Tugevad tüübid ja turvaline arendus |
| **Groq API** | LLaMA 3.1 mudel palgatrendi kokkuvõtteks |
| **Statistikaamet API** | Palgaandmete allikas |

---
## Kuvatõmmis näide

<img width="977" height="927" alt="toiduained" src="https://github.com/user-attachments/assets/2b2a0882-4c94-4b9c-896d-e23bf69fda73" />


