const mail = require("nodemailer");
const express = require("express");
const Router = express.Router();
require("dotenv").config();

Router.post("/Mailgonder", async (req, res) => {
    const { subject, mailTo, message } = req.body;
    let transporter = mail.createTransport({
        host: process.env.MAIL_HOST,
        port: parseInt(process.env.MAIL_PORT),
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.MAIL_USER, // generated ethereal user
            pass: process.env.MAIL_PASSWORD // generated ethereal password
        }
    });
    let info = transporter.sendMail({
        from: process.env.MAIL_USER,
        to: mailTo,
        subject: subject,
        html: message,
    });
    info.then((response) => { console.log(response) })
    res.send({ Result: info });
});

module.exports = Router;