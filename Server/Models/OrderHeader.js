const Restful = require("node-restful");
const mongoose = Restful.mongoose;
const OptionsSchema = new mongoose.Schema(
  {
    UserId: { type: String, require: true },
    Status: { type: Boolean, default: true },
    OrderType: { type: String, default: "Rezerve" },
  },
  {
    timestamps: true,
  }
);

module.exports = Restful.model("OrderHeader", OptionsSchema);
