//from  app.js

//chat
// const http = require("http");
// const server = http.createServer(app);
// var io = require('socket.io')(server);

// server.listen(3005, ()=> {
//   console.log("socket io initialized on ", 3005)
// })
// const port = process.env.PORT
// const chat = require("./routes/chat"); 

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