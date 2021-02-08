const Express = require("express");
const Model = require("../../Models/Pages");
const Router = Express.Router();

Model.methods(["get", "post", "put", "delete"]);
Model.register(Router, "/Pages");

module.exports = Router;
