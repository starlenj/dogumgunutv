const Express = require("express");
const Model = require("../../Models/TicketHeader");
const Router = Express.Router();
const { HandleResponse } = require("../../Helper/HandleResponse");
Model.methods(["get", "post", "put", "delete"]);
Model.register(Router, "/TicketHeader");
Router.post("/SetTicketStatus", async (req, res) => {
  const { Status, id } = req.body;
  let UpdateData = await Model.findById(id);
  UpdateData.Status = Status;
  let ResultData = await UpdateData.save();
  HandleResponse(req, res, "Kayıt Güncellendi", ResultData);
});
Router.post("/GetTicket", async (req, res) => {
  const { TicketType } = req.body;
  let ResponseData = await Model.find({ TicketType });
  HandleResponse(req, res, null, ResponseData);
});
Router.post("/GetUserTicket", async (req, res) => {
  const { TicketType, UserId } = req.body;
  let ResponseData = await Model.find({ TicketType, UserId });
  HandleResponse(req, res, null, ResponseData);
})
Router.post("/GetProductSoru", async (req, res) => {
  const { ProductId } = req.body;
  let ResponseData = await Model.find({ TicketType: "Soru", ProductId });
  HandleResponse(req, res, null, ResponseData);
})
module.exports = Router;
