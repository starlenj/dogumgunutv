const Express = require("express");
const Model = require("../../Models/OrderHeader");
const Router = Express.Router();
const OrderBody = require("../../Models/OrderBody");
const { HandleResponse } = require("../../Helper/HandleResponse")
Model.methods(["get", "post", "put", "delete"]);
Model.register(Router, "/OrderHeader");
Router.post("/GetOrderList", async (req, res) => {
    var OrderData = [];
    const { UserId } = req.body;
    const HeaderResponse = await Model.find({ UserId });
    HeaderResponse.map(async (OrderHeaderData) => {
        const OrderBodyData = await OrderBody.find({ HeaderId: OrderHeaderData._id });
        OrderData.push({ ...OrderHeaderData, body: OrderBodyData });
    })
    HandleResponse(req, res, null, OrderData);
})
module.exports = Router;
