const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.MONGO_URL)
  .catch((error) => console.log("error in the connection"));

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("db is connected successfully");
});

connection.on("error", (error) => {
  console.log("Error in mongodb", error);
});

module.exports = mongoose;
