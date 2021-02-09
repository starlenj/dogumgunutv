const Express = require("express");
const Model = require("../../model/Chatroom");
const Router = Express.Router();
Model.methods(["get", "post", "put", "delete"]);
Model.register(Router, "/Chatrooms");
module.exports = Router;
