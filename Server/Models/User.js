const Restful = require("node-restful");
const mongoose = Restful.mongoose;
const UserSchema = new mongoose.Schema({
  Name: { type: String, },
  Email: { type: String, require: true, unique: true },
  Password: { type: String, require: true },
  Status: { type: Boolean, default: false },
  EmailSubmitDate: { type: String },
  Phone: { type: String, default: "" },
  PhoneSubmit: { type: String },
  Tc: { type: String, default: "" },
  Gender: { type: String, default: "" },
});

module.exports = Restful.model("Users", UserSchema);
