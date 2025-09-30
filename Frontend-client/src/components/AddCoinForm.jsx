import { useState, useEffect } from "react";
import { searchCoinsFormValidation } from "../../services/coingecko";

// pass down props from app.jsx
function AddCoinForm({ addCoin, onCoinAdded, watchlist, setWatchList }) {

  //stores what user types in the field
  const [coinName, setCoinName] = useState("");
  //stores all valid coins from coingecko for validation
  const [validCoins, setValidCoins] = useState([]);
  //stores error message displayed to the user
  const [error, setError] = useState("");

  //Pull xternal data: fetch coin data for the watchlist
  useEffect(() => {
    const fetchCoin = async () => {
      try {
        //fetch list of valid coins from coingecko
        const res = await searchCoinsFormValidation();
        // save the list of valid coins to state for form validation
        setValidCoins(res);
      } catch (err) {
        console.error("Error fetching coin data:", err);
      }
    };
    fetchCoin();
  }, []);

  //when form submits, this happens
  const handleSubmit = async (e) => {
    e.preventDefault(); //prevents default behavior: page refresh, no form spasm
    const coin = coinName.trim().toLowerCase();

    if (!coin) return; //prevents empty submit on the form

    // Check if coin exists in Coingecko API:returns tru if coin matches
    const coinExists = validCoins.some((c) => c.id.toLowerCase() === coin);
    if (!coinExists) {
      setError("Cannot find your coin name from Coingecko API. Try another.");
      return;
    }

    // Check if coin is already in watchlist (avoid duplicates)
    const alreadyInWatchlist = watchlist.some(
      (c) => c.fields.Name.toLowerCase() === coin
    );
    if (alreadyInWatchlist) {
      setError(`${coin} is already in your watchlist.`);
      return;
    }

    try {
      // Add coin to Airtable
      await addCoin(coin);

      // Update watchlist in App.jsx immediately, update UI locally + add the new coin to the watchlist
      setWatchList([
        ...watchlist,
        { id: coin, fields: { Name: coin } }, 
      ]);

      onCoinAdded(); // trigger any parent refresh
      setCoinName(""); // clear input field
      setError(""); // clear error messages
    } catch (err) {
      console.error("Error adding coin:", err);
      setError("Failed to add coin. Try again.");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="rounded-md border border-solid p-2 m-2"
          placeholder="Which coin do you want to add to watchlist?"
          value={coinName}
          //   {/* Whatever is inputted into the form update state */}
          onChange={(e) => setCoinName(e.target.value)}
          required
        ></input>
        <button type="submit" className="orange-btn">
          Add Coin To Watchlist
        </button>
      </form>
      {/* if error = truthy, show the error */}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
}

export default AddCoinForm;
