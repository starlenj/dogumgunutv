const Restful = require("node-restful");
const mongoose = Restful.mongoose;
const OptionsSchema = new mongoose.Schema(
  {
    HeaderId: { type: String, require: true },
    Status: { type: Boolean, default: true },
    ProductId: { type: String },
    ProductName: { type: String },
    Price: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = Restful.model("OrderBody", OptionsSchema);
