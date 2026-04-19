# Shady Meadows – API & UI Tesztautomata projekt

[![Playwright Tests](https://github.com/tamas-csendes-qa/shady_meadows-API-UI-POM/actions/workflows/playwright.yml/badge.svg)](https://github.com/tamas-csendes-qa/shady_meadows-API-UI-POM/actions/workflows/playwright.yml)

Playwright + TypeScript alapú tesztautomatizálási projekt az [automationintesting.online](https://automationintesting.online) weboldalhoz. A projekt UI és API teszteket egyaránt tartalmaz, Page Object Model (POM) architektúrával felépítve.

## Technológiák

- [Playwright](https://playwright.dev/) – tesztautomatizálási keretrendszer
- [TypeScript](https://www.typescriptlang.org/) – programozási nyelv
- [Node.js](https://nodejs.org/) – futtatókörnyezet
- [GitHub Actions](https://github.com/features/actions) – CI/CD pipeline

## Telepítés

### Előfeltételek

- Node.js (LTS verzió)
- npm

### Lépések

```bash
# Repó klónozása
git clone https://github.com/thomee84/shady_meadows-API-UI-POM.git
cd shady_meadows-API-UI-POM

# Függőségek telepítése
npm install

# Playwright böngészők telepítése
npx playwright install
```

## Tesztek futtatása

```bash
# Összes teszt futtatása
npx playwright test

# Tesztek futtatása UI módban
npx playwright test --ui

# HTML report megnyitása
npx playwright show-report
```

## Projekt struktúra

```
├── .github/workflows/    # GitHub Actions CI/CD pipeline
├── factories/            # Tesztadat factory-k
├── pages/                # Page Object Model osztályok
├── tests/                # Tesztesetek
├── playwright.config.ts  # Playwright konfiguráció
└── tsconfig.json         # TypeScript konfiguráció
```

## Architektúra

A projekt Page Object Model (POM) mintát alkalmaz:

- **BasePage** – közös alap minden page object számára
- **BookingPage** – szobakeresés és foglalás indítása
- **ReservationPage** – foglalási adatok megadása és megerősítés

A tesztadatok factory osztályokon keresztül kerülnek létrehozásra, ami rugalmas adatkezelést tesz lehetővé.

## CI/CD

A GitHub Actions pipeline automatikusan lefuttatja a teszteket minden `push` és `pull request` eseményre a `main` ágon. A tesztfutás eredménye HTML report formájában 30 napig elérhető az Actions fülön.
