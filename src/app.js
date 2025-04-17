const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.use(express.json());

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length == 0) {
      res.status(404).send("User Not found!");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (error) {
    res.status(400).send("something went wrong!");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const allowedUpdates = [
      "firstName",
      "lastName",
      "about",
      "skills",
      "password",
      "age",
      "gender",
      "photoUrl",
    ];
    const isAllowedUpdates = Object.keys(data).every((item) =>
      allowedUpdates.includes(item)
    );
    if (!isAllowedUpdates) {
      throw new Error("Updates not allowed, due to invalid data submission");
    }
    if (data?.skills?.length > 10) {
      throw new Error("Skills can not be more than 10");
    }
    const updatedUser = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(updatedUser);
    res.send("User Updated!" + updatedUser);
  } catch (error) {
    res.status(400).send("Error Failed: " + error.message);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(400).send("something went wrong");
  }
});

app.post("/signup", async (req, res) => {
  const userObj = req.body;
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
