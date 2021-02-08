const Express = require("express");
const Model = require("../../Models/Address");
const Router = Express.Router();
const { HandleResponse } = require("../../Helper/HandleResponse")
Model.methods(["get", "post", "put", "delete"]);
Model.register(Router, "/Address");
Router.post("/GetAddress", async (req, res) => {
    const { UserId } = req.body;
    const UserAddress = await Model.find({ UserId });
    HandleResponse(req, res, null, UserAddress);
});
module.exports = Router;
