const jwt = require("jsonwebtoken");

const User = require("../models/user");
const userAuth = async (req, res, next) => {
  //*Read the token from the req cookies
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Token is not Valid !!!!!!!!");
    }

    //*Validate the token

    const decodedData = await jwt.verify(token, "DEV@tinder$18#");

    const { _id } = decodedData;

    //*Find the user

    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;

    next();
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
};

module.exports = {
  userAuth,
};
