// react components call on the functions in these file, to talk to your proxy server, which talks to airtable

//Sends new data from the app to airtable 
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

//fetches the list of coins saved in my airtable watchlist table
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

//deletes a coin from the airtable table by its recordID
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