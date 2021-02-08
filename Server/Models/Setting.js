const Restful = require("node-restful");
const mongoose = Restful.mongoose;
const OptionsSchema = new mongoose.Schema(
    {
        ReserverTime: { type: String, default: 30 },
        Title: { type: String, require: true },
    },
    {
        timestamps: true,
    }
);

module.exports = Restful.model("Setting", OptionsSchema);
