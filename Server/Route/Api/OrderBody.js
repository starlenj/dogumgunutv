const Express = require("express");
const Model = require("../../Models/OrderBody");
const Router = Express.Router();
const { HandleResponse } = require("../../Helper/HandleResponse");
Model.methods(["get", "post", "put", "delete"]);
Model.register(Router, "/OrderBody");
Router.post("/GetUserOrder", async (req, res) => {
    const { UserId } = req.body
    let Response = await Model.find({ UserId });
    HandleResponse(req, res, null, Response);
})
module.exports = Router;
