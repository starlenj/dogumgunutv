const express = require("express"),
  router = express.Router(),
  UserRef = require("../../database/UserRef");

router.post("/", async (req, res) => {
  try {
    const { userId, email } = req.body;
    let UserRefResult = await UserRef.find({ userId });
    if (UserRefResult.length === 5) {
      res.send({ success: false, message: "Kullanıcı Ekleme Sınırı 5'tir " });
    } else {
      let NewUserRef = new UserRef({
        userId,
        email,
      });
      let NewUserRefResponse = await NewUserRef.save();
      res.send({
        success: true,
        message: "Ekleme İşlemi Başarılıdır..",
        data: NewUserRefResponse,
      });
    }
  } catch (error) {
    //let error handler
  }
});

module.exports = router;
