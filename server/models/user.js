const bcrypt = require("bcryptjs");
const mongoose = require("../db/db");
const Schema = mongoose.Schema;

//Define our model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    default: "User",
  },
});

// Hash the password before saving
userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

//Create the model class
const User = mongoose.model("users", userSchema);

//Export the model
module.exports = User;
