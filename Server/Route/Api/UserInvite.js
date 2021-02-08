const Express = require("express");
const Model = require("../../Models/UserInvite");
const Router = Express.Router();

Model.methods(["get", "post", "put", "delete"]);
Model.register(Router, "/UserInvite");

module.exports = Router;
