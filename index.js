const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectDB } = require("./config/db");
const router = require("./routes/index");
const bodyParser = require("body-parser");

const { MONGODB_URI, PORT } = process.env;
const app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// connect to db
connectDB(MONGODB_URI);

// routes
app.use("/api", router);

// port
const port = PORT || 5000;

// listen to port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
