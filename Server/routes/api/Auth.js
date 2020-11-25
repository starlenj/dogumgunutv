const Express = require("express");
const Router = Express.Router();
const jwt = require("jsonwebtoken");
const responseHand = require("../../helpers/response");

Router.post("/CheckToken", async (req, res) => {
  const { token } = req.body;

  jwt.verify(token, process.env.SERVER_SECRET, (err, decoded) => {
    if (err) {
      responseHand.ErrorHandler(req, res, "Geçersiz Token");
    } else {
      responseHand.ResponseHandler(req, res, "Geçerli Token", decoded);
    }
  });
});
module.exports = Router;
