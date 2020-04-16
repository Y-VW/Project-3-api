const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  name: String,
  email: String,
  password: String,
  address: String,
  coordinates: {
    type: [Number]
  }
});

const User = mongoose.model("users", UserSchema);
module.exports = User;
