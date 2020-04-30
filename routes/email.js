const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const creds = require("../auth/config");
const User = require("../models/User");

const transporter = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    auth: {
        user: creds.USER,
        pass: creds.PASS
    }
    })

transporter.verify((error, success) => {
    if (error) {
        console.log("transporter is not working")
    } else {
        console.log("Server is ready to take messages");
    }
})



router.post("/:id", (req, res) => {
    let data = req.body
    User.findById(req.params.id)
    .then((recipient) => {
        console.log(data)
        const mailOptions = {
            from: data.email,
            to: recipient.email,
            subject: "New message Stekkie",
            html: `<p>From ${data.email}</p>
                    <p>Subject: ${data.title}</p>
                    <p>Message: ${data.text}</p>
                    <p>Sender: ${data.sender}
            `
        }
    
        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                console.log("error:", err);
                res.json({msg: "fail"})
            } 
            else {
                console.log("message is sent");
                res.json({msg: "success"})
            }
        })
    })
   
    
})

module.exports = router;
