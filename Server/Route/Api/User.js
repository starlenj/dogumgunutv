const Express = require("express");
const Model = require("../../Models/User");
const Router = Express.Router();

Model.methods(["get", "post", "put", "delete"]);
Model.register(Router, "/User");

module.exports = Router;
