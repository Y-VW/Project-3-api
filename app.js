require('dotenv').config();

var express = require('express');
const mongoose = require('mongoose');
var path = require('path');
// var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var app = express();
app.use(cors({
  origin: ["http://localhost:3001", "https://localhost:3001"],
  credentials: true
}
));

mongoose
  .connect(`${process.env.DB}`, { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

app.use(session({
  secret: "basic-auth-secret",
  cookie: { maxAge: 60000 * 60 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 * 1000
  }),
  saveUninitialized: true,
  // resave: false,
}));

function protect(req, res, next, err) {
  if (req.session.currentUser) next();
  else res.status(500).json(err)
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/signup", require("./routes/signup"))
app.use("/login", require("./routes/login"))
app.use("/logout", require("./routes/logout"))
app.use("/api", require("./routes/plantAPI"))
app.use("/userPlants", protect, require("./routes/userPlants"))
app.use("/marketplace", protect, require("./routes/marketplace"))


module.exports = app;
