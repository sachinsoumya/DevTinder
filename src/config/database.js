const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://Sachin:Sachin123@cluster0.uevtgld.mongodb.net/devTinder"
  );
};


console.log(module);

module.exports = connectDb;

// connectDb()
//   .then(() => {
//     console.log("Database connection established");
//   })
//   .catch((err) => {
//     console.log("Error connecting to database: " + err.message);
//   });
