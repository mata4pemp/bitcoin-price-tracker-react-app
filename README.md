Bitcoin Tracker App

=======

1. App Overview

Bitcoin Tracker App is a simple React application that allows users to view Bitcoin metrics (price, market cap, 24h change) and add coins to a watchlist.

Key features:
• Fetches live Bitcoin data from a public API
• Allows users to add coins to a watchlist
• Demonstrates lifted state and prop passing between components
• Basic routing between pages

---

Screenshot:

![Bitcoin Tracker App Screenshot](./image.png)

---

Component

1. App.jsx
   Root component, holds main state (bitcoin, watchlist)

2. NavBar.jsx
   Top navigation links

3. Home.jsx
   Displays Bitcoin metrics

4. Watchlist.jsx
   Shows coins in watchlist

5. AddCoinForm.jsx
   Form to add coins to watchlist
   addCoin

---

Structure of my app:
bitcoin-price-tracker-react-app/
├── Frontend-client/
│ ├── src/
│ │ ├── components/
│ │ │ └── [your component files]
│ │ ├── services/
│ │ │ ├── airtable.js
│ │ │ └── coingecko.js
│ │ ├── styles/
│ │ │ └── [your CSS modules]
│ │ └── utils/
│ │ └── ErrorBoundary.jsx
│ └── public/
└── proxy-server/
└── server.js

---

Props (4)
• title → NavBar
• bitcoin → Home
• watchlist → Watchlist
• addCoin → Watchlist & AddCoinForm

State (useState) (2)
• bitcoin → fetched from API
• watchlist → lifted state shared with children

React Router Routes (2)
• / → Home page
• /watchlist → Watchlist page

Lifted State (1)
• watchlist is lifted to App.jsx
• Passed down to Watchlist.jsx and AddCoinForm.jsx via props
• Child components can update it via the addCoin handler

---

Technologies Used
• React
• React Router DOM
• Fetch API
• Airtable (Act as database)

---

Attributions
• Coingecko API for Bitcoin price data
• React documentation for component and state management

---

# React + Vite

> > > > > > > b9757ff3da7d5401dfa6095951cd3b04443705b0

App Overview
Bitcoin Tracker App is a simple React application that allows users to view Bitcoin metrics (price, market cap, 24h change) and add coins to a watchlist. The app demonstrates basic React concepts including state management, props, component structure, and routing.

Key features: • Fetches live Bitcoin data from a public API • Allows users to add coins to a watchlist • Demonstrates lifted state and prop passing between components • Basic routing between pages
Screenshot:

Live Demo:

Component

App.jsx Root component, holds main state (bitcoin, watchlist)

NavBar.jsx Top navigation links

Home.jsx Displays Bitcoin metrics

Watchlist.jsx Shows coins in watchlist

AddCoinForm.jsx Form to add coins to watchlist addCoin

Props (4) • title → NavBar • bitcoin → Home • watchlist → Watchlist • addCoin → Watchlist & AddCoinForm

State (useState) (2) • bitcoin → fetched from API • watchlist → lifted state shared with children

React Router Routes (2) • / → Home page • /watchlist → Watchlist page

Lifted State (1) • watchlist is lifted to App.jsx • Passed down to Watchlist.jsx and AddCoinForm.jsx via props • Child components can update it via the addCoin handler

Technologies Used • React • React Router DOM • Fetch API

Attributions • Coingecko API for Bitcoin price data • React documentation for component and state management

React + Vite
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

@vitejs/plugin-react uses Babel for Fast Refresh
@vitejs/plugin-react-swc uses SWC for Fast Refresh
Expanding the ESLint configuration
If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the TS template for information on how to integrate TypeScript and typescript-eslint in your project.

---

Component Hierarchy

App.jsx (root)
├─ NavBar.jsx <-- navigation links
├─ Routes
│ ├─ "/" → BitcoinHomePage.jsx (Bitcoin metrics)
│ └─ "/watchlist" → WatchlistPage.jsx
│ └─ AddCoinForm.jsx (inside Watchlist page)
