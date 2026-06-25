# Dog HQ

Next.js + Tailwind + shadcn/ui MVP dla właścicieli psów: dziennik codziennej opieki, przypomnienia zdrowotne i kopiowalny „Dog Passport” dla rodziny, petsittera albo weterynarza.

## Dlaczego

Research wskazał lukę między aplikacjami robiącymi jedną rzecz dobrze: GPS, marketplace spacerów, trening albo rekordy weterynaryjne. Mało kto dobrze obsługuje codzienną koordynację opieki w domu: kto karmił, kto podał lek, co powiedzieć opiekunowi i jakie objawy pokazać weterynarzowi.

## Stack

- Next.js App Router
- React + TypeScript
- Tailwind CSS v4
- shadcn/ui-style local components: Button, Card, Badge, Input, Textarea, Select, Separator
- LocalStorage persistence in the browser

## Funkcje MVP

- Landing page z pozycjonowaniem produktu
- Edytowalny profil psa
- Szybki dziennik: spacer, jedzenie, woda, kupka, lek, nastrój, trening
- Przypomnienia: szczepienie, lek, weterynarz, pielęgnacja
- Dog Passport: kopiowalna karta psa z rutyną, kontaktami, triggerami i ostatnimi logami
- Responsywny interfejs w stylu warm/premium

## Development

```bash
npm install
npm run dev
npm run lint
npm run build
```

## Następne kroki po MVP

- Autentyczne współdzielenie przez link / konta opiekunów
- Eksport PDF na wizytę weterynaryjną
- Wykresy trendów: waga, nastrój, epizody lęku, leki
- Multi-dog support
- PWA + powiadomienia push
