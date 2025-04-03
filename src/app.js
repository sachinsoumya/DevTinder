const express = require("express");

const mongoose = require("mongoose");

const cookieParser = require("cookie-parser");

const authRouter = require("./Routes/auth");

const profileRouter = require("./Routes/profile");

const requestRouter = require("./Routes/request");

// const jwt = require("jsonwebtoken");

// const { adminAuth, userAuth } = require("./middlewares/auth");

// console.log(typeof express);

const app = express();

const connectDb = require("./config/database");

console.log(require("./config/database"));

require("./config/database");

app.use(express.json());

app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

console.log(typeof User);

// app.get("/feed", async (req, res) => {
//   try {
//     const allUsers = await User.find({});
//     res.send(allUsers);
//   } catch (err) {
//     res.status(400).send("something went wrong");
//   }
// });

// app.get("/user", async (req, res) => {
//   try {
//     const user = await User.find({ email: req.body.email });

//     // const user = await User.findOne({ email: req.body.email });

//     // if (!user) {
//     //   res.send("User not found");
//     // } else {
//     //   res.send(user);
//     // }

//     // const user = await User.findById({_id:req.body._id});

//     // console.log(user);
//     // res.send(user);

//     console.log(user);

//     if (user.length == 0) {
//       res.status(404).send("User not found");
//     } else {
//       res.send(user);
//     }
//   } catch (err) {
//     res.status(400).send("something went wrong");
//   }
// });

// app.delete("/user", async (req, res) => {
//   const userId = req.body.userId;
//   try {
//     const user = await User.findByIdAndDelete({ _id: userId });

//     // const user = await User.findByIdAndDelete(userId);

//     res.send("User deleted successfully");
//   } catch (err) {
//     res.status(400).send("Something went wrong");
//   }
// });

// //*Update the user data.
// app.patch("/user/:userId", async (req, res) => {
//   console.log(req.params);
//   const userId = req.params?.userId;

//   const data = req.body;

//   console.log(userId);
//   // console.log(mongoose.Types.ObjectId.isValid(userId));

//   // const userid = mongoose.Types.ObjectId(userId)

//   try {
//     const allowedUpdate = ["gender", "photoUrl", "about", "skills", "age"];

//     const isUserUpdate = Object.keys(data).every((item) =>
//       allowedUpdate.includes(item)
//     );

//     console.log(isUserUpdate);

//     if (!isUserUpdate) {
//       throw new Error("can't update user");
//     }

//     if (data.skills?.length > 10) {
//       throw new Error("you can only update upto 10 skills");
//     }
//     const user = await User.findByIdAndUpdate({ _id: userId }, data, {
//       returnDocument: "before",
//       runValidators: "true",
//     });
//     console.log(user);
//     // const user = await User.findOneAndUpdate({ email: req.body.email }, data);
//     // console.log(user);
//     res.send("User updated successfully");
//   } catch (err) {
//     res.status(400).send("Updation Failed Something went wrong" + err.message);
//   }
// });

//* Feed Api = getting

connectDb()
  .then(() => {
    console.log("Database connection established");

    app.listen(7777, () => {
      console.log("server is sucessfully in port 7777....");
    });
  })
  .catch((err) => {
    console.log("Error connecting to database: " + err.message);
  });
