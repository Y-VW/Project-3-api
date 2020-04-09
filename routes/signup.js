const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/", (req, res) => {
  const { name, username, email, password } = req.body;
  User
  .findOne({ "username": username })
  .then(user => {
    if (user !== null) {
        res.status(500)
        res.json({err: "The username already exists!"})
    } 
    else {
      if (checkPassword(password) !== true){
        //insert some errormessage here that will be shown 
        res.err("Error")
      } 
      bcrypt.hash(password, 10, function(err, hash) {
        if (err) next("hashing error");
        else {
          User.create({
            name: name,
            email: email,
            username: username,
            password: hash
          })
            .then(response => {
              res.json(response)
            })
            .catch(err => {
              res.json(err)
            });
        }
      });
    }
  })
  .catch(err => {
    res.send("user not created", err);
  });
});

function checkPassword(str){
  // at least one number, one lowercase and one uppercase letter
  // at least 8 characters
  var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
  return re.test(str);
}   

module.exports = router;
