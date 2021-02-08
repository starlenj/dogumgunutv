const Express = require("express");
const Model = require("../../Models/Options");
const Router = Express.Router();

Model.methods(["get", "post", "put", "delete"]);
Model.register(Router, "/Options");

module.exports = Router;
