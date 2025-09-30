//code for my proxy server

// Req > sends request from react frontend >  proxy > external API
// Res > sends data from API > proxy server > client/ react frontend

	// express → runs your server and endpoints
	// cors → allows React frontend to talk to your server
	// fetch / node-fetch → lets your server talk to external API coingecko/airtable
	// dotenv → loads your secret keys safely

//load my keys from env into the project
require("dotenv").config(); //load .env files into process.env, where API keys live
const express = require("express"); //express framework
const cors = require("cors"); //cors middlewear to allow react frontend to access this proxy server
const fetch = require("node-fetch"); //i know we have fetch in node v18, but putting this to ensure we have latest fetch,lets server make HTTP requests to airtable/coingecko

//create an insatnace of express
const app = express();
//define the port the proxy server runs on, 3001
const PORT = 3001;

//use CORS middleware, allow react to call the porxy
app.use(cors());
//all incoming requests/data from frontend put into JSON format. frontend > proxy server > API. When data from API > proxy, its alreayd JSON
app.use(express.json());

//airtable Base URLs
const AIRTABLE_BASE_URL = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}`;
const AIRTABLE_API_KEY = process.env.REACT_APP_AIRTABLE_TOKEN_ID;
const AIRTABLE_TABLE_NAME = process.env.REACT_APP_AIRTABLE_TABLE_NAME;

//coingecko BASE URL
const COINGECKO_BASE_URL = "https://api.coingecko.com/api/v3/";

// CoinGecko endpoints / proxy <> Airtable API actions

// Endpoint 1: Get coin data from Coingecko (Market cap/24h vol/24h change)
app.get("/api/coins/:coinId", async (req, res) => {
  try {
    const { coinId } = req.params; //assign coin name from url,put in a variable called coinID
    const response = await fetch(
      `${COINGECKO_BASE_URL}/simple/price?ids=${coinId}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`
    );

    console.log(response);

    if (!response.ok) {
      throw new Error("Failed to fetch coin data");
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching coin data", error);
    res.status(500).json({ error: error.message });
  }
});

//Endpoint 2: Whatever user type in form coin, Search for coins from coingecko by user query
// app.get("/api/search/coins", async (req, res) => {
//   try {
//     const { query } = req.query; //what user searchers on query put it into variable called query
//     const response = await fetch(`${COINGECKO_BASE_URL}/search?query=${query}`);

//     if (!response.ok) {
//       throw new Error("failed to find coin");
//     }

//     const data = await response.json();
//     res.json(data);
//   } catch (error) {
//     console.error("Error finding coins during search", error);
//     res.status(500).json({ error: error.message });
//   }
// });

//Endpoint 2: Fetches a list of all coins from coingecko, Validation for the form, used in addcoinform.jsx search the coins whether in the coingecko API
app.get("/api/search/validate-coins", async (req, res) => {
  try {
    const response = await fetch(`${COINGECKO_BASE_URL}/coins/list`);
    
    console.log("this is res proxy",res);
    //data = {bitcoin, symbol, etc...}
    if (!response.ok) {
      throw new Error("Error fetching coin data");
    }
    const data = await response.json();
    res.json(data);

    //update state, goes through the list of coins via their ID: bitcoin, etherermy, coin name
    // setValidCoins(data.map((coin) => coin.id.toLowerCase()));
  } catch (err) {
    console.error("Error fetching coin data", err);
    res.status(500).json({ error: err.message })
  }
});

// AIRTABLE endpoints / proxy <> Airtable API actions

// Endpoint 1: User Adds coin to watchlist, send coin to airtable DB table
app.post("/airtable/send", async (req, res) => {
  try {
    // console.log(req.body);
    const coinData = req.body;
    //want to POST send data to airtable to create new row in table
    const response = await fetch(
      `${AIRTABLE_BASE_URL}/${AIRTABLE_TABLE_NAME}`,
      {
        method: "POST",
        //tell airtable who we are , sending JSON data over
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        //crypto coin name data convert from JS object to JSON string
        body: JSON.stringify({
          fields: {
            Name: coinData.name,
          },
        }),
      }
    );

    const data = await response.json();

    //response.ok = yes,                                                    wanna log it so i can see in console if it goes through
    console.log(
      "airtable POST request FE > airtable status: ",
      response.status
    );
    console.log("airtable response body:", data);

    if (!response.ok) {
      console.error("airtable error:", data);
      res.status(response.status).json(data);
      return;
    }

    res.json(data);
  } catch (error) {
    console.error("error adding coin data to aritable", error);
    //code knows the coin is not succesful when added with
    res.status(500).json({ error: error.message });
  }
});

// Endpoint 2: get watchlist from Airtable, shows it on the react frontend
app.get("/api/watchlist", async (req, res) => {
  try {
    const response = await fetch(
      `${AIRTABLE_BASE_URL}/${AIRTABLE_TABLE_NAME}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_TOKEN_ID}`,
          "Content-Type": "application/json",
        },
      }
    );

    // console.log(response);

    if (!response.ok) {
      throw new Error("Failed to fetch watchlist");
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching watchlist:", error);
    res.status(500).json({ error: error.message });
  }
});

//Endpoint 3: Remove a coin from airtable using recordID 
app.delete("/api/watchlist/:recordId", async (req, res) => {
  try {
    const { recordId } = req.params;
    const response = await fetch(
      `${AIRTABLE_BASE_URL}/${AIRTABLE_TABLE_NAME}/${recordId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete record");
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error deleting record:", error);
    res.status(500).json({ error: error.message });
  }
});

//listening to the port 3001 now
app.listen(PORT, () => {
  console.log(`listening to proxy server ${PORT}`);
});
