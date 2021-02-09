const Express = require("express");
const Model = require("../../model/Admin");
const Router = Express.Router();
Model.methods(["get", "post", "put", "delete"]);
Model.register(Router, "/Admins");
module.exports = Router;
