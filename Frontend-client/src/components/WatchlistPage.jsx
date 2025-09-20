import { useState, useEffect } from "react";
import { getWatchlist } from "../../services/airtable";
import { getCoinData } from "../../services/coingecko";
import AddCoinForm from "./AddCoinForm";

function WatchlistPage({ addCoin, removeCoin }) {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const data = await getWatchlist();
        setWatchlist(data.records);
      } catch (error) {
        console.error("Error fetching watchlist:", error);
      }
    };

    fetchWatchlist();
  }, []);

  return (
    <>
      <h1>My Crypto Watchlist</h1>
      <AddCoinForm addCoin={addCoin} />
      <ul>
        {watchlist.map((coin, index) => (
          <div key={coin.id || index}>
            <span>{coin.fields.Name}</span>
            <button onClick={() => removeCoin(coin.fields.Name)}>Remove</button>
          </div>
        ))}
      </ul>
    </>
  );
}

export default WatchlistPage;
