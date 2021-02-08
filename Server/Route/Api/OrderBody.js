const Express = require("express");
const Model = require("../../Models/OrderBody");
const Router = Express.Router();

Model.methods(["get", "post", "put", "delete"]);
Model.register(Router, "/OrderBody");

module.exports = Router;
