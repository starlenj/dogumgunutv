const Express = require("express");
const Model = require("../../Models/Images");
const Router = Express.Router();
const { HandleResponse } = require("../../Helper/HandleResponse");
Model.methods(["get", "post", "put", "delete"]);
Model.register(Router, "/Images");
Router.post("/CheckImageProduct", async (req, res) => {
    const { ProductId } = req.body;
    let ProductResponse = await Model.find({ ProductId });
    HandleResponse(req, res, null, ProductResponse);
})
module.exports = Router;
