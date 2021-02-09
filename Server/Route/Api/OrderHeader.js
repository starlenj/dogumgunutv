const Express = require("express");
const Model = require("../../Models/OrderHeader");
const Router = Express.Router();
const OrderBody = require("../../Models/OrderBody");
const { HandleResponse } = require("../../Helper/HandleResponse")
const moment = require("moment");
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
Router.post("/GetDateIsAvaible", async (req, res) => {
    const { Date } = req.body;
    const CheckOrder = await Model.find({ OrderDate: moment(Date).format("YYYY-MM-DD HH") })
    HandleResponse(req, res, null, CheckOrder);
})
module.exports = Router;
