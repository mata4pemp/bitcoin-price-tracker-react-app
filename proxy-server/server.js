//load my keys from env into the project
require("dotenv").config();
const express = require("express");
const cors = requires("cors");

//create an insatnace of express
const app = express();
//define the port the proxy server runs on, 3001
const PORT = 3001;
//use CORS middleware, allow react to call the porxy
app.use(cors());
//all incoming requests/data from frontend put into JSON format. frontend > proxy server > API. When data from API > proxy, its alreayd JSON
app.use(express.json());

//listening to the port 3001 now
app.listen(PORT, () => {
  console.log(`listening to proxy server ${PORT}`);
});
