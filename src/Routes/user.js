const express = require("express");

const userRouter = express.Router();

const { userAuth } = require("../middlewares/auth");

const connectionRequest = require("../models/connection");

const USER_SAFE_DATA = "firstName lastName gender photoUrl about";

const User = require("../models/user");

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    //* loggedInUser should be toUserId  and status should be interested

    const receivedRequests = await connectionRequest
      .find({
        toUserId: loggedInUser,
        status: "interested",
      })
      .populate("fromUserId", USER_SAFE_DATA);

    res.json({
      message: "connection requests received",
      data: receivedRequests,
    });
  } catch (err) {
    res.status(400).send("ERROR" + " " + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    //* We need to get connections where status is accepted

    const connections = await connectionRequest
      .find({
        $or: [
          { toUserId: loggedInUser._id, status: "accepted" },
          { fromUserId: loggedInUser._id, status: "accepted" },
        ],
      })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    if (!connections) {
      res.json({ message: "No Connections yet" });
    }

    const data = connections.map((row) => {
      if (row.fromUserId._id.equals(loggedInUser._id)) {
        return row.toUserId;
      } else {
        return row.fromUserId;
      }
    });

    // console.log(data);

    res.json({ message: "Connection requests", data });
  } catch (err) {
    res.status(400).send("ERROR" + " " + err.message);
  }
});

userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;

    let limit = parseInt(req.query.limit) || 10;

    limit = limit > 50 ? 50 : limit;

    const skip = (page - 1) * limit;

    //* User should see all user cards except
    //* 1. his own card
    //* 2. his own connection
    //* 3. ignored people
    //* 4. interested people (already sent connection request)

    //* example = Rohit -> Rahul

    //* Find out all the connections either sent or received

    const connections = await connectionRequest
      .find({
        $or: [
          {
            toUserId: loggedInUser._id,
          },
          {
            fromUserId: loggedInUser._id,
          },
        ],
      })
      .select("fromUserId toUserId");

    const hideUsersIds = new Set();

    connections.forEach((req) => {
      hideUsersIds.add(req.fromUserId.toString());
      hideUsersIds.add(req.toUserId.toString());
    });

    // console.log(hideUsersIds);

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersIds) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    res.send(users);
  } catch (err) {
    res.status(400).send("ERROR" + " " + err.message);
  }
});

module.exports = userRouter;
