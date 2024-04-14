const mongoose = require("mongoose");

class Mongoose {
  constructor() {
    try {
      // mongoose.connect(
      //   "mongodb+srv://admin:admin@cluster0.ufvmrlk.mongodb.net/?authSource=admin",
      //   {
      //     useNewUrlParser: true,
      //     useCreateIndex: true,
      //     useUnifiedTopology: true,
      //     useFindAndModify: false,
      //   }
      // );
      // return mongoose;

      //Local DB
      mongoose.connect("mongodb://localhost:27017/dbconnect", {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      });
      return mongoose;
    } catch (err) {
      console.log("Mongo Error: \n", err);
    }
  }
}

module.exports = new Mongoose();
