Bitcoin Tracker App

1. App Overview

Bitcoin Tracker App is a simple React application that allows users to view Bitcoin metrics (price, market cap, 24h change) and add coins to a watchlist. The app demonstrates basic React concepts including state management, props, component structure, and routing.

Key features:
	•	Fetches live Bitcoin data from a public API
	•	Allows users to add coins to a watchlist
	•	Demonstrates lifted state and prop passing between components
	•	Basic routing between pages
------------------------------------------------------------------


Screenshot:


------------------------------------------------------------------

Live Demo:

 
------------------------------------------------------------------


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


------------------------------------------------------------------

Props (4)
	•	title → NavBar
	•	bitcoin → Home
	•	watchlist → Watchlist
	•	addCoin → Watchlist & AddCoinForm

 State (useState) (2)
	•	bitcoin → fetched from API
	•	watchlist → lifted state shared with children

 React Router Routes (2)
	•	/ → Home page
	•	/watchlist → Watchlist page

 Lifted State (1)
	•	watchlist is lifted to App.jsx
	•	Passed down to Watchlist.jsx and AddCoinForm.jsx via props
	•	Child components can update it via the addCoin handler

------------------------------------------------------------------

 Technologies Used
	•	React
	•	React Router DOM
	•	Fetch API

------------------------------------------------------------------

 Attributions
	•	Coingecko API for Bitcoin price data
	•	React documentation for component and state management


------------------------------------------------------------------
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
