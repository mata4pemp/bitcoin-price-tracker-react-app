import React from "react";

function AddCoinForm() {
  const [coinName, setCoinName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!coinName) return; //if wrong coin name, stop the function

    setCoinName(coinName); //update state and field with the name of coin selected by user
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
    </>
  );
}

export default AddCoinForm;
