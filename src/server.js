console.log("----  Welcome to Fast Jobs Assignment ----");

const {loadPetsData} = require("./models/pets.model.js");

const http = require("http");
const mongoose = require("mongoose");
require("dotenv").config();
const MONGO_URL = process.env.MONGO_URL;
const app = require("./app");

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("Mongoose Connection is ready!");
});
mongoose.connection.on("error", (err) => {
  console.error(`Mongoose Connection Error ${err}`);
});

async function startServer() {
  await mongoose.connect(MONGO_URL);

  await loadPetsData();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();
