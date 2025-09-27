import { useEffect } from "react";
import { getWatchlist } from "../../services/airtable";
import AddCoinForm from "./AddCoinForm";

function WatchlistPage({ watchlist, setWatchList, addCoin, removeCoin }) {
  // Fetch the watchlist from airtable, update the state in app.jsx 
  const fetchWatchlist = async () => {
    try {
      const data = await getWatchlist();

      //if airtable comes back with a record of data, update watchlist with data
      if (data.records) {
        setWatchList(data.records);
      }
    } catch (error) {
      console.error("Error fetching watchlist:", error);
    }
  };

  // Initial fetch watchlist when component mounts
  useEffect(() => {
    fetchWatchlist();
  }, []);

  // When coin is added in addcoinform.jsx, refresh watchlist to refelct latest airtable data
  const handleCoinAdded = () => {
    fetchWatchlist(); // Refresh the watchlist
  };

  // Remove coin from airtable watchlist
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
      <h1>My Crypto Watchlist 🚀</h1>
      <AddCoinForm
        addCoin={addCoin}
        onCoinAdded={handleCoinAdded}
        watchlist={watchlist}
        setWatchList={setWatchList}
      />
      <ul>
        {watchlist
          .filter((coin) => coin && coin.fields && coin.fields.Name) // Only keep coins that are valid, Filter out invalid entries
          .map((coin) => ( // for each coin in watchlist create name remove button
            <div key={coin.id}>
              <span>{coin.fields.Name}</span>
              <button
                className="remove-btn"
                onClick={() => handleRemove(coin.id)}
              >
                Remove
              </button>
            </div>
          ))}
      </ul>
    </>
  );
}

export default WatchlistPage;
