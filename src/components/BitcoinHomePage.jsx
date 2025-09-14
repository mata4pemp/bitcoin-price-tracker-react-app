import { useState } from "react";
import { getBitcoinData } from "../../services/coingecko";

function BitcoinHomePage() {
  const [bitcoin, setBitcoin] = useState(null);

  return (
    <>
      <h1>Bitcoin Price: </h1>
      <h1>Market Cap: </h1>
      <h1>24H Change: </h1>
    </>
  );
}

export default BitcoinHomePage;
