const Express = require("express");
const Model = require("../../Models/Setting");
const Router = Express.Router();

Model.methods(["get", "post", "put", "delete"]);
Model.register(Router, "/Setting");

module.exports = Router;
