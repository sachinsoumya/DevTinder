const mongoose = require("mongoose");

var validator = require("validator");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

// console.log(mongoose.Schema);

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },

    lastName: {
      type: String,
    },

    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Use a strong password" + " " + value);
        }
      },
    },

    age: {
      type: Number,
      min: 18,
    },

    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email must be valid email address" + " " + value);
        }
      },
    },

    photoUrl: {
      type: String,
      default:
        "https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg",
      validate(value) {
        if (!validator.isURL(value))
          throw new error("Invalid URL : " + " " + value);
      },
    },
    about: {
      type: String,
      default: "This is default description of user",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJwtToken = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, "DEV@tinder$18#", {
    expiresIn: "1d",
  });
  return token;
};

userSchema.methods.verifyPassword = async function (passwordInputByUser) {
  const user = this;

  const passwordHash = user.password;

  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );

  return isPasswordValid;
};

const user = mongoose.model("User", userSchema);

module.exports = user;
