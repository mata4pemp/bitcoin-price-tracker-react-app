import { useState } from "react";
import { BrowserRoute as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import BitcoinHomePage from "./components/BitcoinHomePage";
import WatchlistPage from "./components/WatchlistPage";

function App() {
  return (
    <>
      <p className="read-the-docs">To The Moon </p>

      {/* Enable routing for the navbar to the various page */}
      <Router>
        <Navbar />
        <Routes>
          {/* //route to the specific URL and show the associated component */}
          <Route path="/" element={<BitcoinHomePage />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
        </Routes>
      </Router>

      <NavBar />
      <BitcoinHomePage.jsx />
      <WatchlistPage.jsx />
      <AddCoinForm.jsx />
    </>
  );
}

export default App;
