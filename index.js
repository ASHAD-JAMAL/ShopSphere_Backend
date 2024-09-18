const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectDB } = require("./config/db");
const router = require("./routes/index");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const { MONGODB_URI, PORT } = process.env;
const app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(cookieParser());

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
