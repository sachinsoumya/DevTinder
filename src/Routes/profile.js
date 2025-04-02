const express = require("express");
const { userAuth } = require("../middlewares/auth");

const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const { user } = req;

    res.send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }

  // res.send(cookies);
});

module.exports = profileRouter;
