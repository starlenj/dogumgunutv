const Restful = require("node-restful");
const mongoose = Restful.mongoose;
const CategorySchema = new mongoose.Schema(
  {
    Name: { type: String, require: true },
    Status: { type: Boolean, default: true },
    Price: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = Restful.model("Category", CategorySchema);
