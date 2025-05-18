const express = require("express");

const { userAuth } = require("../middlewares/auth");

const requestRouter = express.Router();

const connectioRequest = require("../models/connection");

const User = require("../models/user");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;

      const toUserId = req.params.toUserId;
      const status = req.params.status;

      // const loggedInUser = req.user;

      const allowedStatus = await User.findById(toUserId);

      // console.log(allowedStatus);

      // console.log(fromUserId.toString());

      // console.log(toUserId);

      //* If the user sending connection request to himself

      // if (fromUserId.toString() === toUserId) {
      //   return res
      //     .status(404)
      //     .json({ message: "User is not allowed to send connection request" });
      // }

      if (!allowedStatus) {
        return res
          .status(404)
          .json({ message: "User is not allowed to send connection request " });
      }

      //* if there is an existing connection request

      const existingConnectionRequest = await connectioRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        return res.status(400).json({
          message: "A connection request already exists for user",
        });
      }

      const newConnectionRequest = new connectioRequest({
        fromUserId,

        toUserId,

        status,
      });

      const data = await newConnectionRequest.save();

      res.json({
        message:
          req.user.firstName +
          " " +
          status +
          (status === "interested" ? " " + "in" : " ") +
          " " +
          allowedStatus.firstName,

        data: data,
      });
    } catch (err) {
      res.status(400).send("ERRoR : " + err.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;

      const { status, requestId } = req.params;

      //* Validate the status

      const allowedStatus = ["accepted", "rejected"];

      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "status is not allowed" });
      }

      //* Gambhir => Anil (anil should be loggedin)

      const ConnectionRequest = await connectioRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });

      if (!ConnectionRequest) {
        res.status(400).json({ message: "Connection request is not found" });
      }

      ConnectionRequest.status = status;

      const data = await ConnectionRequest.save();

       res.json({ message: "connection request", data: data });

      //* status = interested

      //* request id should be valid i.e should be in the db.
    } catch (err) {
      res.status(400).send("ERROR" + err.message);
    }
  }
);

module.exports = requestRouter;
