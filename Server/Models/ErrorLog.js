const Restful = require("node-restful");
const mongoose = Restful.mongoose;
const UserLogSchema = new mongoose.Schema(
  {
    Action: { type: String, require: true },
    Method: { type: String, require: true },
    UserId: { type: String, require: true },
    Result: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

module.exports = Restful.model("ErrorLog", UserLogSchema);
