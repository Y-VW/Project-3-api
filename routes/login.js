const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/", (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({
    username
  })
    .then((user) => {
      if (!user) {
        res.status(500);
        res.json({err: "Invalid credentials"})
      } 
      else {
        bcrypt.compare(password, user.password, function (
          err,
          correctPassword
        ) {
          if (err) {
            res.status(500);
            res.json({err: "Invalid credentials"})
          } 
          else if (!correctPassword) {
            res.status(500);
            res.json({err: "Invalid credentials"})
          } 
          else {
            req.session.currentUser = user;
            console.log(req.session.currentUser._id)
            res.json({
                email: user.email, 
                username: user.username, 
                _id: user._id, 
                coordinates: user.coordinates
              })
          }
        });
      }
    })
    .catch((err) => {
        res.status(500);
        res.json({err})
    });
});


module.exports = router;
