const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    title: String,
    message_to_user: {
        type: mongoose.Schema.ObjectId, 
        ref: "users"
    },
    message_from: {
        type: mongoose.Schema.ObjectId, 
        ref: "users"
    },
    message: String
  });
  
  const Message = mongoose.model("messages", MessageSchema);
  module.exports = Message;
  