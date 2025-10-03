import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import BitcoinHomePage from "./components/BitcoinHomePage";
import WatchlistPage from "./components/WatchlistPage";
import { handleUpdateAirtable } from "../services/airtable";
import "./App.css";
import { removeCoinFromWatchlist } from "../services/airtable";

function App() {
  const [watchlist, setWatchList] = useState([]);

  //New coin added to the watchlist when pressed, whichever coin person adds to the watchlist, updates the state to the watchlist
  const addCoin = async (coinName) => { //coinName is the coin user adds to form
   

    //push the coin to Airtable, handleupdateAirtable function comes from services > airtable
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

  //remove the coin from the watchlist, removecoin function from airtable services folder
  const removeCoin = async (recordId) => {
    try {
      await removeCoinFromWatchlist(recordId);
      //prev = current state, list of coins in the watchlist, for each coin in array, check if coin.id not equal to recordID, if true= keep coin in  new array, if false, exclude coin from new array ,.filter = makes a new list without the coin you want to remove, so 'solana' disappears from page
      setWatchList((prev) => prev.filter((coin) => coin.id !== recordId));
    } catch (error) {
      console.error("Error removing coin:", error);
    }
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
                setWatchList={setWatchList}
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
