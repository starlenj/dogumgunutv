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
Router.post("/OrderUpdateStatus",async(req,res)=>{
let {Status,id}= req.body
let UpdateData = await  Model.findById(id)
  UpdateData.Status=Status
let Response = await  UpdateData.save();
  HandleResponse(req,res,"Siparis Durumu Guncellendi",Response);
})

module.exports = Router;
