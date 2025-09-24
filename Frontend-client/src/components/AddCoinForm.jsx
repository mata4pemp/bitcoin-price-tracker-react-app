import { useState, useEffect } from "react";

// pass down addCoin as a prop from app.jsx
function AddCoinForm({ addCoin, onCoinAdded }) {
  const [coinName, setCoinName] = useState("");
  const [validCoins, setValidCoins] = useState([]);
  const [error, setError] = useState("");

  //Pull xternal data: fetch coin data for the watchlist
  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const res = await fetch("https://api.coingecko.com/api/v3/coins/list");
        //data = {bitcoin, symbol, etc...}
        const data = await res.json();

        //update state, goes through the list of coins via their ID: bitcoin, etherermy, coin name
        setValidCoins(data.map((coin) => coin.id.toLowerCase()));
      } catch (err) {
        console.error("Error fetching coin data", err);
      }
    };
    fetchCoinData();
  }, []);

  //when form submits, this happens
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(coinName);
    const coin = coinName.trim().toLowerCase();
    // console.log(coin)

    if (!coin) return; //prevents empty submit on the form

    if (!validCoins.includes(coin)) {
      setError(
        "Cannot find your coin name from coingecko API, try typing something else"
      );
      return;
    }

    await addCoin(coin); //add coin user search for to the watchlist
    onCoinAdded();
    setCoinName(""); //clear the input field after submit
    setError(""); //reset error state to nothing if coin is found on submit
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
        <button type="submit">Add Coin To Watchlist</button>
      </form>
      {/* if error = truthy, or if there is an error, show error message that coin
      is not found */}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
}

export default AddCoinForm;
