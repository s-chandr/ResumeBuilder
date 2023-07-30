const path = require('path');
const colors = require('colors'); //colourful terminal
const morgan = require('morgan'); // logger
const dotenv = require('dotenv');
dotenv.config({path : './config/config.env'});

const connectDB = require('./config/db');
connectDB();

const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passportSetup = require("./passport");
const passport = require("passport");
const authRoute = require("./routes/auth");
const user = require("./routes/user");
const app = express();
app.use(express.json());// this willl allow us to use body parser (req.body)
app.use(
  cookieSession({ name: "session", keys: ["some_key"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoute);
app.use("/api/user", user);

app.listen("5000", () => {
  console.log("Server is running!");
});
