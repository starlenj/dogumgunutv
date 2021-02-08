const Restful = require("node-restful");
const mongoose = Restful.mongoose;
const UserHareketSchema = new mongoose.Schema(
  {
    UserId: { type: String },
    HareketTuru: { type: String, require: true },
    bakiye: { type: Number, default: 0 },
    status: { type: Boolean, default: false },
    HareketTarihi: { type: String, default: Date.now }
  },
  { timestamps: true }
);

module.exports = Restful.model("UserHareket", UserHareketSchema);
