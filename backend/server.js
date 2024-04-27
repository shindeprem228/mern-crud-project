const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dtev = require("dotenv");
dtev.config();
const userRoute = require("./routes/userRoute.js");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/api/", userRoute);
mongoose
  .connect(process.env.URI)
  .then(() => {
    app.listen(process.env.PORT, (err) => {
      if (err) console.log(err);
      console.log("App running at", process.env.PORT);
    });

    console.log("DB Conected Successfully");
  })
  .catch((err) => {
    console.log("Error : ", err);
  });
