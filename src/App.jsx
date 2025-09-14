import { useState } from "react";
import { BrowserRoute as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import BitcoinHomePage from "./components/BitcoinHomePage";
import WatchlistPage from "./components/WatchlistPage";

function App() {
  return (
    <>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <Router>
        <Navbar />
        <Routes></Routes>
      </Router>

      <NavBar />
      <BitcoinHomePage.jsx />
      <WatchlistPage.jsx />
      <AddCoinForm.jsx />
    </>
  );
}

export default App;
