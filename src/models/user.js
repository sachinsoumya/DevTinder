const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },

  lastName: {
    type: String,
  },

  password: {
    type: String,
  },

  age: {
    type: Number,
  },

  gender: {
    type: String,
  },
  email: {
    type: String,
  },
});

const user = mongoose.model("User", userSchema);

module.exports = user;
