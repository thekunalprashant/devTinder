const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "Kunal",
    lastName: "Prashant",
    emailId: "kunalkabir7@gmail.com",
    password: "Kunal@112",
    age: 24,
    gender: "Male",
  };
  const user = new User(userObj);
  try {
    await user.save();
    res.send("User Added successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established.");
    app.listen(7777, () => {
      console.log("Server is running....");
    });
  })
  .catch((err) => {
    console.error("Database can not be connected");
  });
