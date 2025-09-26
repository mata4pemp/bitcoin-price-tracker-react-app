import { useState, useEffect } from "react";
import { getWatchlist } from "../../services/airtable";
import AddCoinForm from "./AddCoinForm";

function WatchlistPage({ watchlist, setWatchList, addCoin, removeCoin }) {
  // Move fetchWatchlist outside useEffect so we can reuse it
  const fetchWatchlist = async () => {
    try {
      const data = await getWatchlist();
      if (data.records) {
        setWatchList(data.records);
      }
    } catch (error) {
      console.error("Error fetching watchlist:", error);
    }
  };

  // Initial fetch when component mounts
  useEffect(() => {
    fetchWatchlist();
  }, []);

  // Handle coin added
  const handleCoinAdded = () => {
    fetchWatchlist(); // Refresh the watchlist
  };

  // Remove coin from watchlist
  const handleRemove = async (recordId) => {
    try {
      await removeCoin(recordId);
      // Refresh the watchlist after removal
      fetchWatchlist();
    } catch (error) {
      console.error("Error removing coin:", error);
    }
  };

  return (
    <>
      <h1>My Crypto Watchlist</h1>
      <AddCoinForm
        addCoin={addCoin}
        onCoinAdded={handleCoinAdded}
        watchlist={watchlist}
        setWatchList={setWatchList}
      />
      <ul>
        {watchlist
          .filter((coin) => coin && coin.fields && coin.fields.Name) // Filter out invalid entries
          .map((coin) => (
            <div key={coin.id}>
              <span>{coin.fields.Name}</span>
              <button onClick={() => handleRemove(coin.id)}>Remove</button>
            </div>
          ))}
      </ul>
    </>
  );
}

export default WatchlistPage;
