const Express = require("express");
const Router = Express.Router();
const UserModel = require("../../Models/User");
const { HandleError, HandleResponse } = require("../../Helper/HandleResponse");
const jwt = require("jsonwebtoken");

Router.get("/UserOnay/:token", async (req, res) => {
    let { token } = req.params
    var decoded = await jwt.decode(token, process.env.SECRET);
    const user = decoded.data;
    let UpdateUser = await UserModel.findById(user._id);
    UpdateUser.Status = true;
    UpdateUser.save();
    var lastToken = await jwt.sign({ data: user }, process.env.SECRET)
    HandleResponse(req, res, "Kullanıcı Onayı Tamamlandı", lastToken);
});
module.exports = Router;