const Restful = require("node-restful");
const mongoose = Restful.mongoose;
const PagesSchema = new mongoose.Schema(
  {
    Title: { type: String, require: true },
    Url: { type: String, require: true },
    Info: { type: String, require: true },
    Status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = Restful.model("Pages", PagesSchema);
