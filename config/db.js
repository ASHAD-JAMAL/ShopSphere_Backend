const mongoose = require("mongoose");

const connectDB = (MONGODB_URI) => {
  mongoose.connect(MONGODB_URI); // Removed deprecated options
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
