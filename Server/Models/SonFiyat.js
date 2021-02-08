const Restful = require("node-restful");
const mongoose = Restful.mongoose;
const OptionsSchema = new mongoose.Schema(
  {
    UserId: { type: String, require: true },
    Email: { type: String, require: true },
    Status: { type: Boolean, default: true },
    ProductId: { type: String, require: true },
    Order: { type: Number, default: 0 },
    Price: { type: String, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = Restful.model("SonFiyat", OptionsSchema);
