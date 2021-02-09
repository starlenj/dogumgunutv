const Express = require("express");
const Model = require("../../model/Package");
const Router = Express.Router();
Model.methods(["get", "post", "put", "delete"]);
Model.register(Router, "/Packages");
module.exports = Router;
