const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/", (req, res) => {
  const { name, username, email, password, city, country } = req.body;
  User
  .findOne({ "username": username })
  .then(user => {
    if (user !== null) {
        res.status(500)
        res.json({error: "The username already exists!"})
    } 
    else {
      if (checkPassword(password) !== true){
        //insert some errormessage here that will be shown 
        res.json({error: "Password is invalid"})
      } 
      bcrypt.hash(password, 10, function(err, hash) {
        if (err) next("hashing error");
        else {
          User.create({
            name: name,
            email: email,
            username: username,
            password: hash,
            city: city,
            country: country,
          })
            .then(response => {
              res.json(response)
            })
            .catch(error => {
              console.log(error)
              res.json({error: "Was not able to create user"})
            });
        }
      });
    }
  })
  .catch(error => {
    console.log(error)
    res.json({error: "user not created"});
  });
});

function checkPassword(str){
  // at least one number, one lowercase and one uppercase letter
  // at least 8 characters
  var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
  return re.test(str);
}   

module.exports = router;
