const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
require("dotenv").config()

const workerRoutes = require("./routes/workerRoutes");
const landingRoutes = require("./routes/landingRoutes");
const randomRoutes = require("./routes/randomRoutes");

const loginRoutes = require("./routes/loginRoutes");
const signupRoutes = require("./routes/signupRoutes");
const salesRoutes = require("./routes/salesRoutes");
const creditRoutes = require("./routes/creditRoutes");
const produceRoutes = require("./routes/produceRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");
const SignUp = require("./models/signUp");

const app = express();

// app.locals.moment = require("./moment"); // moment for data formating and global variable

// app.use('/images', express.static('images'))

// app.locals.moment = require("moment")

app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));
app.set("view engine", "pug");


mongoose.connect(process.env.DATABASE_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) console.log("Connected to mongo DB");
    else console.log("Error connecting to mongoDB  " + err);
  }
);

const expressSession = require('express-session')({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
  });

app.use(expressSession);
//configuring passport
app.use(passport.initialize());
app.use(passport.session());
// to read JSON post data
app.use(express.json());


//--------------------------------
passport.use(SignUp.createStrategy());
passport.serializeUser(SignUp.serializeUser());
passport.deserializeUser(SignUp.deserializeUser());

//Global variable for  loggedin users
app.get('*', (req, res, next) => {
    res.locals.user = req.user || null;
    next();
})




app.use("/", landingRoutes);
app.use("/", randomRoutes)
app.use("/", loginRoutes);
app.use("/", signupRoutes);
app.use("/", salesRoutes);
app.use("/", creditRoutes);
app.use("/", produceRoutes);
app.use("/", purchaseRoutes);
app.use("/", workerRoutes);

const port = process.env.PORT || 3003;
app.listen(port);
console.log("Server started at http://localhost:" + port);