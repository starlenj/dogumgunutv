const Express = require("express");
const Model = require("../../Models/TicketBody");
const Router = Express.Router();
const { HandleResponse } = require("../../Helper/HandleResponse");
Model.methods(["get", "post", "put", "delete"]);
Model.register(Router, "/TicketBody");
Router.post("/GetBody", async (req, res) => {
  const { HeaderId } = req.body;
  let ResponseData = await Model.find({ HeaderId });
  HandleResponse(req, res, null, ResponseData);
});
module.exports = Router;
