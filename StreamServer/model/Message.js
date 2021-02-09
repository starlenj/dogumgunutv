const Restful = require("node-restful");
const mongoose = Restful.mongoose;
const UserSchema = new mongoose.Schema({
  chatroom: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  status: {
    type: Number,
    default: 1
  },
},
  {
    timestamps: true
  }
);


module.exports = Restful.model("Message", UserSchema);
