const Express = require("express");
const Router = Express.Router();
const UserModel = require("../../database/User");
const ShortId = require("shortid");
const bcrypt = require("bcrypt");
const ResponseHandle = require("../../helpers/response");
const jwt = require("jsonwebtoken");

Router.post("/Register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const CheckUser = await UserModel.findOne({ email });
    if (CheckUser !== null) {
      ResponseHandle.ErrorHandler(req, res, "Kullanıcı Kaydı Mevcuttur");
    }

    bcrypt.hash(password, 10).then(async (hash) => {
      const Users = await new UserModel({
        stream_key: ShortId.generate(),
        username,
        email,
        password: hash,
      }).save();
      const token = jwt.sign({ data: Users }, process.env.SERVER_SECRET, {
        expiresIn: Math.floor(Date.now() / 1000) + 60 * 60,
      });
      ResponseHandle.ResponseHandler(req, res, "Kayıt Başarılı.", token);
    });
  } catch (e) {
    console.log(e);
  }
});
module.exports = Router;
