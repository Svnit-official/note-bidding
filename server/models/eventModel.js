const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    clubId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    eventName: {
        type: String
    },
    clubName: {
        type: String
    },
    eventDescription: {
        type: String
    },
    eventPoster: {
        type: String
    },
    registerationLink: {
        type: String
    },
    web: {
        type: String
    },
    socialMedia: {
        type: String
    }
})

const Event = new mongoose.model("Event", eventSchema);

module.exports = Event;
