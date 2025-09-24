//open this when using proxy server, when testing in browser hardcore base ID and API key
// const BASE_URL = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}`;

// const API_KEY = process.env.REACT_APP_AIRTABLE_TOKEN_ID;

export const handleUpdateAirtable = async (newData) => {
  try {
    const res = await fetch("http://localhost:3001/airtable/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });
    const data = await res.json();
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export const getWatchlist = async () => {
  try {
    const res = await fetch("http://localhost:3001/api/watchlist");
    if (!res.ok) {
      throw new Error("Failed to fetch watchlist");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching watchlist:", error);
    throw error;
  }
};

export const removeCoinFromWatchlist = async (recordId) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/watchlist/${recordId}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to remove coin");
    }
    return await response.json();
  } catch (error) {
    console.error("Error removing coin:", error);
    throw error;
  }
};