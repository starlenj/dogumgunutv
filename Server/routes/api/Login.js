const Express = require("express");
const Router = Express.Router();
const UserModel = require("../../database/User");
const bcrypt = require("bcrypt");
const responseHandler = require("../../helpers/response");
const jwt = require("jsonwebtoken");
Router.post("/Login", async (req, res) => {
  const { email, password } = req.body;
  const CheckUser = await UserModel.find({ email });
  if (CheckUser.length > 0) {
    //password kontrol
    console.log(CheckUser);
    const isValidPassword = await bcrypt.compareSync(
      password,
      CheckUser[0].password
    );
    if (isValidPassword) {
      //giriş tamam
      const token = jwt.sign({ data: CheckUser }, process.env.SERVER_SECRET, {
        expiresIn: Math.floor(Date.now() / 1000) + 60 * 60,
      });
      responseHandler.ResponseHandler(req, res, "Giriş Başarılı", token);
    } else {
      //şifre hatalıdır
      responseHandler.ErrorHandler(req, res, "Hatalı Şifre");
    }
  } else {
    //e posta hatalıdır
    responseHandler.ErrorHandler(req, res, "Hatalı Kullanıcı");
  }
});

module.exports = Router;
