const Express = require("express");
const Model = require("../../Models/UserHareket");
const Router = Express.Router();
const { HandleResponse } = require("../../Helper/HandleResponse");
Model.methods(["get", "post", "put", "delete"]);
Model.register(Router, "/UserHareket");
Router.post("/IslemOnay", async (req, res) => {

    let { id, status } = req.body;
    let UpdateData = await Model.findById(id);
    UpdateData.status = status;
    let response = await UpdateData.save();
    HandleResponse(req, res, "Güncelleme Başarılı", response);

});
Router.post("/GetBakiye", async (req, res) => {
    const { UserId } = req.body;
    const UserHareketData = await Model.find({ UserId: UserId, status: true });

    var Bakiye = 0;
    UserHareketData.map((Hareket) => {

        Bakiye += Hareket.bakiye
    })
    HandleResponse(req, res, null, Bakiye);
})
module.exports = Router;
