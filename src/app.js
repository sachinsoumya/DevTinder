const express = require("express");

// console.log(typeof express);

const app = express();

// console.log(app);

// app.use("/", (req, res) => {
//   res.send("Hello from dashboard .....");

// });

app.use("/home/123", (req, res) => {
  res.send("Welcome to home 123💕💕😁");
});

app.use("/home", (req, res) => {
  res.send("Hello from home😊☀️");
});

app.use("/test/12", (req, res) => {
  res.send("This is test 2💓");
});

app.use("/test", (req, res) => {
  res.send("Hello world from express javascript..");
});

app.use("/hello", (req, res) => {
  res.send("1");
});

app.use("/about123", (req, res) => {
  res.send("This is about route");
});

app.use("/", (req, res) => {
  res.send("Hello from dashboard .....");
});

app.listen(7777, () => {
  console.log("server is sucessfully in port 7777....");
});
