import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import BitcoinHomePage from "./components/BitcoinHomePage";
import WatchlistPage from "./components/WatchlistPage";

function App() {
  const [watchlist, setWatchList] = useState([]);

  const addCoin = (coinName) => {
    //New coin added to the watchlist when pressed, whichever coin person adds to the watchlist, updates the state to the watchlist
    setWatchList([...watchlist, coinName]);
  };

  return (
    <>
      {/* Enable routing for the navbar to the various page */}

      {/* Stays on every page, lives outside routes */}
      <NavBar />
      <Routes>
        {/* //route to the specific URL and show the associated component */}
        <Route path="/" element={<BitcoinHomePage />} />
        <Route
          path="/watchlist"
          element={
            <>
              {/* pass down props for watchlist and coinName function  */}
              <WatchlistPage watchlist={watchlist} addCoin={addCoin} />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
