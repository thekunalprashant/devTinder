const express = require("express");
const app = express();

app.use("/",(req, res)=>{
    res.send("namaste kunal!")
})

app.use("/test", (req, res) => {
  res.send("Server is live...");
});

app.listen(7777, () => {
  console.log("Server is running....");
});
