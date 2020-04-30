var express = require("express");
const router = express.Router();
const Message = require("../models/Message");

//messages to the user
router.get("/:plantownerid", (req, res, next) => {
    Message.find({ message_to_user: req.params.plantownerid })
        .populate("message_from")
        .then((message) => {
            console.log(message)
            res.json({ messages: message })
        })
        .catch((err) => {
            res.status(500);
            res.json({ err })
        });
})

//sending a message to another user
router.post("/newmessage", (req, res, next) => {
    Message
        .create({
            title: req.body.title,
            message_to_user: req.body.message_to_user,
            message_from: req.body.message_from,
            message: req.body.message
        })
        .then((message) => {
            res.json({ message: "new message was sent" })
        })
        .catch((err) => {
            res.status(500);
            res.json({ err })
        });
})

module.exports = router