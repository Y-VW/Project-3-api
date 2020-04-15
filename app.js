require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
// var cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

//chat
// const http = require("http");
// const server = http.createServer(app);
// var io = require('socket.io')(server);

// server.listen(3005, ()=> {
//   console.log("socket io initialized on ", 3005)
// })
// const port = process.env.PORT
// const chat = require("./routes/chat"); 

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
app.use("/plants", protect, require("./routes/plants"))
app.use("/email" , require("./routes/email"));

//chat 
// app.use(chat);


// let allUsers = {}; 
// io.origins("*:*");

// io.on('connection', function(socket){
//     console.log('a user connected');
//     socket.on("user_registration", (user)=>{
//       console.log("User wants to register", user)
//       user.socketId = socket.id
//       allUsers[user.username] = user;
//       socket.user = user;
//     })
    
//     socket.on("message", ({recipient, sender, message})=> {
//       console.log(`Received ${message} from ${sender} to ${recipient}`)
//       let recipientSocket = allUsers[recipient].socketId;
//       socket.to(recipientSocket).emit("message", {message: message, from: sender})

//     })
// });

module.exports = app;
