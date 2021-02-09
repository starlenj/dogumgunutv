const Restful = require("node-restful");
const mongoose = Restful.mongoose;
const ProductSchema = new mongoose.Schema(
  {
    Name: { type: String, require: true },
    Price: { type: Number, require: true },
    Info: { type: String },
    ProfilePicture: { type: String },
    Status: { type: Number, default: 1 },
    StreamCount: { type: Number, default: 1 },
  },
  { timestamps: true }
);

module.exports = Restful.model("Product", ProductSchema);
