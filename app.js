require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
// var cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')



app.use(cors({
  origin: [process.env.CLIENTORIGIN1, process.env.CLIENTORIGIN2],
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
app.use("/plants", protect, require("./routes/plants"))
app.use("/email" , protect, require("./routes/email"));



module.exports = app;
