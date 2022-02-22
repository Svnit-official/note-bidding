const mongoose = require("mongoose");

const allowedStatus = [
  "draft", // types of status of requests:
  "sentByClub", // (sent by club, received by faculty)
  "sentByFaculty", // (sent back for correction by faculty)
  "sentByFinance", // (sent back for correction by finance)
  "sentByDean",
  //"correctedDraft", // (sent back for corrections and saved as draft)
  "receivedByFaculty", // (received by faculty after correction )
  "approvedByFaculty", // (approved by faculty, received by finance)
  "rejectedByFaculty",
  "approvedByFinance", // (approved by finance, received by dean)
  "rejectedByFinance",
  "approvedByDean",
  "rejectedByDean",
];

const requestSchema = new mongoose.Schema({
  clubId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Club",
  },
  facultyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
  },
  clubName: {
    type: String,
    // required: [true, "A name must be there"],
    sparse: true,
    unique: false,
  },
  headName: {
    // required: [true, "A name must be there"],
    type: String,
    trim: true,
  },
  eventName: {
    type: String,
    required: [true, "A name must be there"],
  },
  eventDescription:{
    type: String,
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
    enum: allowedStatus,
  },
  financeRequired :{
    type: Boolean,
    required: [true, "If you require finance or not"],
  },
  FirstPrice : {
    type : Number,
    required: [true, "Enter 0 if does not required"],
  },
  
  SecondPrice : {
    type : Number,
    required: [true, "Enter 0 if does not required"],
  },
  
  ThirdPrice : {
    type : Number,
    required: [true, "Enter 0 if does not required"],
  },
  
  expences : {
    type : String,
    required: [true, "Enter 0 if does not required"],
  },
  Total : {
    type : Number,
    required: [true, "Enter 0 if does not required"],
  },
  // comments: [
  //   {  
  //     name: {
  //       type: String,
  //     },
  //     date: {
  //       type: String,
  //     },
  //     time: {
  //       type: String,
  //     },
  //     comment: {
  //       type: String,
  //     } 
  //   }
  // ],

  comments : {
    type : [Object],
    default : []
  },

  timeline: {
    sentByClub: {
      type: Object,
    },
    approvedByFaculty: {
      type: Object,
    },
    approvedByFinance: {
      type: Object,
    },
    approvedByDean: {
      type: Object,
    }
  },
  postEventReport: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Request = new mongoose.model("Request", requestSchema);

module.exports = Request;
