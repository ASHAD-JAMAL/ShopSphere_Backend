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
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(
  cors({
    origin: "*",
    // methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })
);

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
