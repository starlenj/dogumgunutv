const Restful = require("node-restful");
const mongoose = Restful.mongoose;
const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
    }
);


module.exports = Restful.model("Chatroom", UserSchema);

