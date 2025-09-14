import React from "react";
import AddCoinForm from "./AddCoinForm";

//props from app.jsx
function WatchlistPage({ watchlist, addCoin }) {
  return (
    <>
      <h1>My Crypto Watchlist</h1>
      <AddCoinForm addCoin={addCoin}></AddCoinForm>
      <ul>
        {watchlist.map((coinName, index) => (
          <li key={index}>{coinName}</li>
        ))}
      </ul>
    </>
  );
}

export default WatchlistPage;
