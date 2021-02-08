const Restful = require("node-restful");
const mongoose = Restful.mongoose;
const ImagesSchema = new mongoose.Schema(
  {
    Name: { type: String, require: true },
    Url: { type: String, require: true },
    ImageType: { type: String, require: true },
    Status: { type: Boolean, default: true },
    ProductId: { type: String, default: true },
  },
  {
    timestamps: true,
  }
);

module.exports = Restful.model("Images", ImagesSchema);
