const mongoose = require('mongoose');
const Club = require('./clubModel');
const Faculty = require('./facultyModel');

const requestSchema = new mongoose.Schema({
    clubId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Club"
    },
    facultyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty"
    },
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
        default: "draft"
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

