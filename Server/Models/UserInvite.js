const Restful = require("node-restful");
const mongoose = Restful.mongoose;
const UserInviteSchema = new mongoose.Schema(
  {
    UserId: { type: String, require: true },
    InviteEmail: { type: String, require: true, unique: true },
    Status: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = Restful.model("UserInvite", UserInviteSchema);
