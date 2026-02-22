const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    course: String,
    phone: String,
    address: String,
    status: { type: String, default: "Pending" }
}, { timestamps: true });

module.exports = mongoose.model("Application", ApplicationSchema);
