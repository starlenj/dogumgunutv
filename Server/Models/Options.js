const Restful = require("node-restful");
const mongoose = Restful.mongoose;
const OptionsSchema = new mongoose.Schema(
  {
    Name: { type: String, require: true },
    Value: { type: String, require: true },
    Status: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

module.exports = Restful.model("Options", OptionsSchema);
