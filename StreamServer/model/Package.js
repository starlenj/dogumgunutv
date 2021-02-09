
const Restful = require("node-restful");
const mongoose = Restful.mongoose;
const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        info: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
    }
);


module.exports = Restful.model("Package", UserSchema);
