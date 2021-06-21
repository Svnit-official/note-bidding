const mongoose = require('mongoose');
const Club = require('./clubModel');
const Faculty = require('./facultyModel');

const allowedStatus= [
  "draft",                      // types of status of requests:
  "sentByClub",                 // (sent by club, received by faculty)  
  "sentByFaculty",              // (sent back for correction by faculty)
  "sentByFinance",              // (sent back for correction by finance)  
  "correctedDraft",             // (sent back for corrections and saved as draft)           
  "receivedByFaculty",          // (received by faculty after correction )
  "approvedByFaculty",          // (approved by faculty, received by finance)
  "rejectedByFaculty",          
  "approvedByFinance",          // (approved by finance, received by dean)
  "rejectedByFinance",
  "approvedByDean",
  "rejectedByDean",
];

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
    status: {
        type: String,
        default: "draft",
        enum: allowedStatus
    },
    comments: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const Request = new mongoose.model("Request", requestSchema);

module.exports = Request;

