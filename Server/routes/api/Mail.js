const mail = require("nodemailer");
const express = require("express");
const Router = express.Router();
require("dotenv").config();
const jwt = require('jwt');
Router.post("/Mailgonder", async (req, res) => {
    const { subject, mailTo, message, UserId } = req.body;

    let transporter = mail.createTransport({
        host: "mail.hmbrgr.com.tr",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "eatessoy@hmbrgr.com.tr", // generated ethereal user
            pass: "Emre1428!." // generated ethereal password
        }
    });
    let info = transporter.sendMail({
        from: "eatessoy@hmbrgr.com.tr",
        to: mailTo,
        subject: subject,
        html: message,
    });
    res.send({ Result: info });
});

module.exports = Router;
