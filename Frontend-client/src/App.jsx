import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import BitcoinHomePage from "./components/BitcoinHomePage";
import WatchlistPage from "./components/WatchlistPage";
import { handleUpdateAirtable } from "../services/airtable";
import "./App.css";

function App() {
  const [watchlist, setWatchList] = useState([]);

  //New coin added to the watchlist when pressed, whichever coin person adds to the watchlist, updates the state to the watchlist
  const addCoin = async (coinName) => {
    const lowerCaseCoin = coinName.toLowerCase();

    //prevent user from adding 2 of the same coins to the watchlist
    if (watchlist.some((coin) => coin.toLowerCase() === lowerCaseCoin)) {
      alert(
        `${coinName} is already added to your watchlist, choose another coin!`
      );
      return;
    }

    //add new coin to the previous coins in watchlist, prev = current list of coins in the watchlist
    console.log(watchlist);
    setWatchList((prev) => [...prev, coinName]);
    console.log(watchlist);

    //push the coin to Airtable
    try {
      const result = await handleUpdateAirtable(
        { name: coinName },
        "React Project - Bitcoin Price Tracker"
      );

      
      if (result.ok) {
        console.log("Coin successfuly added to airtable", result);
      } else {
        console.error("failed to save coin to airatble", result);
      }
    } catch (error) {
      console.log("error adding coin to aritable", error);
    }
  };

  //remove the coin from the watchlist
  const removeCoin = (coinName) => {
    //prev = current list of coins in the watchlist, .filter = makes a new list without the coin you want to remove, so 'solana' disappears from page
    setWatchList((prev) => prev.filter((c) => c !== coinName));
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
              <WatchlistPage
                watchlist={watchlist}
                addCoin={addCoin}
                removeCoin={removeCoin}
              />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
