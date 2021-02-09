const Restful = require("node-restful");
const mongoose = Restful.mongoose;
const OptionsSchema = new mongoose.Schema(
  {
    UserId: { type: String, require: true },
    Status: { type: Boolean, default: false },
    ProductId: { type: String },
    ProductName: { type: String },
    Price: { type: String },
    Date: { type: String },
    Phone: { type: String, require: true },
    StreamCount: { type: Number, default: 1 }
  },
  {
    timestamps: true,
  }
);

module.exports = Restful.model("OrderBody", OptionsSchema);
