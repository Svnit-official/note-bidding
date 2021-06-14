const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    clubName: {
        type: String,
        required: [true, "A name must be there"],
        unique: true,
        trim: true,
    },
    headName: {
        required: [true, "A name must be there"],
        type: String,
        trim: true,
    },
    eventName: {
        type: String,
        required: [true, "A name must be there"],
    },
    eventDate: {
        type: Date,
    },
    pdf: {
        type: String,
    },
    Status: {
        type: String,
    },
    Comments: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const Request = new mongoose.model("Request", requestSchema);

module.exports = Request;

