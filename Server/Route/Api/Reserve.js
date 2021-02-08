const Express = require("express");
const Model = require("../../Models/Reserve");
const Router = Express.Router();

Model.methods(["get", "post", "put", "delete"]);
Model.register(Router, "/Reserve");

module.exports = Router;
