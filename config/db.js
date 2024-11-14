const mongoose = require("mongoose");

const connectDB = (MONGODB_URI) => {
  mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 50000, // Wait for 50 seconds instead of 30
  });
  const connection = mongoose.connection;

  connection.on("error", (error) => {
    console.log(error);
  });
  connection.once("open", () => {
    console.log("Database Connected Successfully");
  });
};

module.exports = {
  connectDB,
};
