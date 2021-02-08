const Express = require("express");
const Model = require("../../Models/Category");
const Router = Express.Router();

Model.methods(["get", "post", "put", "delete"]);
Model.register(Router, "/Category");

module.exports = Router;
