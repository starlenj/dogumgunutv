const Restful = require("node-restful");
const mongoose = Restful.mongoose;
const OptionsSchema = new mongoose.Schema(
  {
    Message: { type: String, require: true },
    HeaderId: { type: String, require: true },
    MessageType: { type: String, require: true },
    ResponseUser: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

module.exports = Restful.model("TicketBody", OptionsSchema);
