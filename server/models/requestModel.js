const mongoose = require('mongoose');
const Club = require('./clubModel');
const Faculty = require('./facultyModel');

// types of status of requests:
//  1. draft (not sent to anyone yet)
//  2. sentByClub (sent by club, received by faculty)
//  3. sentByFaculty (sent back for correction by faculty)
//  4. sentByFinance (sent back for correction by finance)
//  5. correctedDraft (sent back for corrections and saved as draft)
//  5. receivedByFaculty (received by faculty after correction )  
//  6. receivedByFinance (received by finance after correction )
//  7. approvedByFaculty (approved by faculty, received by finance)
//  8. rejectedByFaculty
//  9. rejectedByFinance
// 10. approvedByFaculty (approved by finance, received by dean)
// 11. approved (by dean)
// 12. rejectedByDean


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
        default: "draft"
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

