const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://bouabidhoua:wxy1ObmYIg4yKzk7@cluster0.roqs6lz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0ç");
    console.log(`Mongodb connected ${mongoose.connection.host}`.bgGreen.white);
  } catch (error) {
    console.log(`Mongodb Server Issue ${error}`.bgRed.white);
  }
};

module.exports = connectDB;
