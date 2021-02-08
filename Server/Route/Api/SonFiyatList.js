const Express = require("express");
const { HandleResponse, HandleError } = require("../../Helper/HandleResponse");
const Model = require("../../Models/SonFiyat");
const UserHareket = require("../../Models/UserHareket");
const Router = Express.Router();

Model.methods(["get", "post", "put", "delete"]);
Model.register(Router, "/SonFiyat");

Router.post("/GetProductFiyatList", async (req, res) => {
  const { ProductId } = req.body;
  let ResponseData = await Model.find({ ProductId })
    .sort({ Order: "desc" })
    .limit(5);
  HandleResponse(req, res, null, ResponseData);
});
Router.post("/SonFiyatGoster", async (req, res) => {
  const { ProductId, Email, UserId, Price } = req.body;
  const UserHareketResponse = await UserHareket.find({ UserId });
  if (UserHareketResponse.length === 0) {
    HandleError(req, res, "Bakiyeniz Yetersizdir");
  }
});
module.exports = Router;
