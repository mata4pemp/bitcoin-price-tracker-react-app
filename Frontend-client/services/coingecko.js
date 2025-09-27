//this file contains functions that have your app talk to the proxy server (localhost: 3001)

// function to get price data for a specific coin/Bitcoin
export const getCoinData = async (coinId = "Bitcoin") => {
  try {
    const res = await fetch(`http://localhost:3001/api/coins/${coinId}`); //make a request to local server
    return await res.json(); //convert response I get from proxy to JSON
  } catch (error) { //if something fails, catch the error
    console.error("Error fetching coin data:", error);
    throw error;
  }
};

// function to let users search for coin by name
export const searchCoins = async (query) => { //query = what the user types into search bar
  try {
    const res = await fetch(
      `http://localhost:3001/api/coins/api/search/coins?query=${query}`
    );
    return await res.json();
  } catch (error) {
    console.error("Error searching coins:", error);
    throw error;
  }
};

//function to fetch a list of all valid coins for validate user input (user types bitcoin, check against this list)
export const searchCoinsFormValidation = async () => {
  try {
    const res = await fetch(`http://localhost:3001/api/search/validate-coins`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error searching coins:", error);
    throw error;
  }
};

//function to add a coin to users watchlist saved in airtable
export const addCoinToWatchlist = async (coinData) => {
  try {
    const res = await fetch("http://localhost:3001/api/watchlist/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(coinData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
