const Club = require("./../models/clubModel");
const Finance = require("./../models/financeModel");
const Dean = require("./../models/deanModel");
const Faculty = require("./../models/facultyModel");
const Request = require("./../models/requestModel");
//const template = require("./template2.js");

const fs = require("fs");
const pdf = require("pdf-creator-node");

const getDate = function () {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  const date = dd + "/" + mm + "/" + yyyy;
  return date;
};

const getTime = function () {
  const date = new Date();
  var hours = date.getHours();
  if (hours < 10) hours = "0" + hours.toString();
  var minutes = date.getMinutes();
  if (minutes < 10) minutes = "0" + minutes.toString();
  var seconds = date.getSeconds();
  if (seconds < 10) seconds = "0" + seconds.toString();
  return hours + ":" + minutes + ":" + seconds;
};

module.exports.downloadPdf = async (req, res) => {
  try {
    const reqid = req.body.id;
    const request = await Request.findById(reqid);
    const eventName = request.eventName;
    const eventDate = request.eventDate;
    const eventDescription = request.eventDescription;

    // dates
    const sentByClub = request.timeline.sentByClub.date;
    const approvedByFaculty = request.timeline.approvedByFaculty.date;
    const approvedByFinance = request.timeline.approvedByFinance.date;
    const approvedByDean = request.timeline.approvedByDean.date;

    const club = await Club.findById(request.clubId);
    const clubSign = club.signature;
    const clubName = club.clubName;

    const faculty = await Faculty.findById(request.facultyId);
    const facName = faculty.facultyName;
    const facSign = faculty.signature;

    const fin = await Finance.find({});
    const finSign = fin[0].signature;
    const finName = fin[0].financeName;

    const dean = await Dean.find({});
    const deanName = dean[0].deanName;
    const deanSign = dean[0].signature;

    const data = {
        //request,
      eventDate,
      eventDescription,
        eventName, 
        clubName,
        sentByClub,  
        approvedByFaculty,
        approvedByFinance,
        approvedByDean,  
        clubSign,  
        facName,
        facSign,
        finSign,
        finName,
        deanName,
        deanSign    
    }
    //const user = req.params.user;
    const user = "Club"
    const options = {
      format: "A3",
      orientation: "portrait",
      border: "10mm",
      margin : "20%",
      header: {
        height: "4mm",
        contents: `<div style="text-align: left;">${getDate()}</div>`,
      },
      footer: {
        height: "4mm",
        contents: `<div style="text-align: left;">${user} Copy</div>`,
      },
    };

    const template = fs.readFileSync("./controller/template.html", "utf8");

    const document = {
     html : template,
     data,
      type: "buffer",
    };
    
    let pdfBuffer = null;
    await pdf
      .create(document, options)
      .then((re) => {
        pdfBuffer = re;
      })
      .catch((error) => {
        console.error(error);
      });

    const pdfBinary = pdfBuffer.toString('base64')
    
    res.status(200).json({
      status: "success",
      requested: req.requestTime,
      pdfBinary,
      message: "Page to change password",
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "failed",
      messsage: err,
    });
  }
};
