const mongoose = require("mongoose");

const URI = "mongodb://127.0.0.1:27017/usuarios_db";

const connectDB = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("BD conectada");
  } catch (err) {
    console.error("Error al conectar la BD:", err);
  }
};

module.exports = { mongoose, connectDB };
