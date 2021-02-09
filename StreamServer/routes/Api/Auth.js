const UserModel = require("../../model/User");
const AdminModel = require("../../model/Admin");
const express = require("express");
const Router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
Router.post("/Auth/Admin", async (req, res) => {
  const { email, password } = req.body;
  const CheckAdminEmail = await AdminModel.find({ email });
  if (CheckAdminEmail.length == 0) {
    res
      .status(401)
      .send({ message: "Kullanıcı Kaydı Bulunamadı", success: false });
  }
  if (password === undefined) {
    res.status(401).send({ message: "Şifre Boş Olamaz!!", success: false });
  }
  const ValidPassword = bcrypt.compareSync(
    password,
    CheckAdminEmail[0].password
  );
  if (!ValidPassword) {
    res.status(401).send({ message: "Hatalı Şifre", success: false });
  }
  req.session.userId = CheckAdminEmail[0]._id;
  res.status(200).send({ User: CheckAdminEmail });
});
Router.post("/Auth/User", async (req, res) => {
  const { email, password } = req.body;
  const CheckAdminEmail = await UserModel.find({ email });
  if (CheckAdminEmail.length == 0) {
    res
      .status(401)
      .send({ message: "Kullanıcı Kaydı Bulunamadı", success: false });
  }
  const ValidPassword = bcrypt.compareSync(
    password,
    CheckAdminEmail[0].password
  );
  if (!ValidPassword) {
    res.status(401).send({ message: "Hatalı Şifre", success: false });
  }
  req.session.userId = CheckAdminEmail[0]._id;
  res.status(200).send({ User: CheckAdminEmail, success: true });
});
Router.get("/Auth/me", async (req, res) => {
  const GetMe = await AdminModel.find({ _id: req.session.userId });
  if (GetMe) {
    console.log(GetMe)
    res.status(200).send({ data: GetMe });
  } else {
    res.status(401);
  }
});
module.exports = Router;
