const express = require("express");

// console.log(typeof express);

const app = express();
//* /abc , /ac
app.use("/ab?c", (req, res) => {
  res.send({ name: "Abc", age: 12 });
});

app.use("/ab+c", (req, res) => {
  res.send({ name: "xyz", address: "UK" });
});

app.use("/a(bc)+d", (req, res) => {
  res.send({ name: "xyz", address: "UK" });
});

app.use("/ab*cd", (req, res) => {
  res.send({ name: "mnc", address: "USA" });
});

app.get(/a/, (req, res) => {
  res.send({ name: "pqr", address: "Paris" });
});
app.get(/.*fly$/, (req, res) => {
  res.send({ name: "pqr", address: "Paris" });
});
app.get("/user", (req, res) => {
  console.log(req.query);

  res.send({ name: "pqr", address: "Paris" });
});
app.use("/user/:uid/:name/:password", (req, res) => {
  console.log(req.query);

  console.log(req.params);

  res.send({ name: "efg", address: "Chichago" });
});
app.get(/.*fly$/, (req, res) => {
  res.send({ name: "pqr", address: "Paris" });
});
app.get(/.*fly$/, (req, res) => {
  res.send({ name: "pqr", address: "Paris" });
});

app.get("/user", (req, res) => {
  res.send({ firstName: "Sachin", lastName: "Panda" });
});

app.post("/user", (req, res) => {
  //* saving data to database via post call
  res.send("Saving data to database...");
});

app.put("/user", (req, res) => {
  res.send("users updated  successfully");
});

app.delete("/user", (req, res) => {
  res.send("Deleted data from database successfully..");
});

app.use("/test", (req, res) => {
  res.send("Hello world from express javascript..");
});

app.listen(7777, () => {
  console.log("server is sucessfully in port 7777....");
});
