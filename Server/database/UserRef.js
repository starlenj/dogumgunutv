let mongoose = require("mongoose"),

    Schema = mongoose.Schema;

let UserRef = new Schema(
    {
        userId: {
            type: String
        },
        email: {
            type: String,
            required: "Email is required!",
        },
        status: { type: Boolean, default: false }
    },
    {
        timestamps: true,
    }
);

module.exports = UserRef;