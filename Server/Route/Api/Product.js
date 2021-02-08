const Express = require("express");
const Model = require("../../Models/Product");
const Router = Express.Router();
const { HandleResponse } = require("../../Helper/HandleResponse");
const SonFiyatModel = require("../../Models/SonFiyat");
Model.methods(["get", "post", "put", "delete"]);
Model.register(Router, "/Product");
Router.post("/ProductImageUpload", async (req, res) => {
    const { id, ProfilePicture } = req.body;
    const UpdateData = await Model.findById(id);
    UpdateData.ProfilePicture = ProfilePicture;
    let ResponseData = await UpdateData.save();
    HandleResponse(req, res, "Resim Güncelleme Başarılı", ResponseData);
});
Router.post("/GetProductWithCategory", async (req, res) => {
    const { CategoryId } = req.body;
    const GetProductList = await Model.find({ CategoryId, Status: 1 }).limit(3);
    HandleResponse(req, res, null, GetProductList);
});
module.exports = Router;
