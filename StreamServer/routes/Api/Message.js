const Express = require("express");
const Model = require("../../model/Message");
const Router = Express.Router();
Model.methods(["get", "post", "put", "delete"]);
Model.register(Router, "/Messages");
module.exports = Router;
