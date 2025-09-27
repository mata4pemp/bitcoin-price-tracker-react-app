import { useState, useEffect } from "react";
import { searchCoinsFormValidation } from "../../services/coingecko";

// pass down addCoin as a prop from app.jsx
function AddCoinForm({ addCoin, onCoinAdded, watchlist, setWatchList }) {
  const [coinName, setCoinName] = useState("");
  const [validCoins, setValidCoins] = useState([]);
  const [error, setError] = useState("");

  //Pull xternal data: fetch coin data for the watchlist
  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const res = await searchCoinsFormValidation();
        console.log("this is res", res);
        setValidCoins(res);
      } catch (err) {
        console.error("Error fetching coin data:", err);
      }
    };
    fetchCoin();
  }, []);

  //when form submits, this happens
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(coinName);
    const coin = coinName.trim().toLowerCase();
    // console.log(coin)
    console.log("this is handlesubmit", validCoins);

    if (!coin) return; //prevents empty submit on the form

    // Check if coin exists in Coingecko API
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

      // Update watchlist in App.jsx immediately
      setWatchList([
        ...watchlist,
        { id: coin, fields: { Name: coin } }, // temporary local update
      ]);

      onCoinAdded(); // trigger any parent refresh
      setCoinName("");
      setError("");
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
      {/* if error = truthy, or if there is an error, show error message that coin
      is not found */}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
}

export default AddCoinForm;
