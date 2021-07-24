const Faculty = require("./../models/facultyModel");
const Request = require("./../models/requestModel");
//const mongodb = require("mongodb");
const jwt = require("jsonwebtoken");

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

// const fs = require("fs");
// const jwt = require("jsonwebtoken");
// const secret = process.env.SECRET || "this-is-my-faculty-secret";
// const expires = process.env.EXPIRES || 1000;
// const bcrypt = require("bcryptjs");
// const signToken = function (id) {
//   return jwt.sign({ id }, secret, { expiresIn: expires });
// };

///////////////////////////////////////////////////////////////////ROUTE: /login
module.exports.authentication = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({
        status: "bad request",
        requested: req.time,
        message: "please provide username and password",
      });
    }
    const foundFaculty = await Faculty.findOne({ username }).select("+password");
    if(foundFaculty && await foundFaculty.correctPassword(password, foundFaculty.password)){
      // req.session.user_id = foundFaculty._id;
      const token = jwt.sign({ id: foundFaculty._id }, "faculty", {
        expiresIn: "2h",
      });
      console.log("loggedIn");
      res.status(200).json({
        status: "success",
        requested: req.time,
        message: "authorised",
        facultyID: foundFaculty._id,
        token,
      });
    } else {
      res.status(401).json({
        status: "unauthorised",
        requested: req.time,
        message: "incorrect username or password",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

///////////////////////////////////////////////////////////////////ROUTE: /facultyDetails
module.exports.getDetailsById = async (req, res) => {
  try {
    const { id } = req.params;
    const facultyDetails = await Faculty.findById(id);
    res.status(200).json({
      status: "success",
      requested: req.requestTime,
      data: {
        facultyDetails,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "failed",
      messsage: err,
    });
  }
};

module.exports.updateDetailsById = async (req, res) => {
  try {
    const { id } = req.params;
    const facultyDetailsOld = await Faculty.findById(id);
    const facultyDetailsNew = req.body;
    await Faculty.findByIdAndUpdate(id, facultyDetailsNew, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      requested: req.requestTime,
      data: {
        message: "redirect to /facultyDetails",
        facultyDetailsOld,
        facultyDetailsNew,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "failed",
      messsage: err,
    });
  }
};

////////////////////////////////////////////////////////////////ROUTE: /pendingRequests
module.exports.getPendingRequests = async (req, res) => {
  try {
    const facultyId = req.params.id;
    const faculty = await Faculty.findOne({ _id: facultyId });
    const clubIds = faculty.facultyClubs;
    const requests = await Request.find({
      $and: [
        { clubId: { $in: clubIds } },
        { $or: [{ status: "sentByClub" }, { status: "receivedByFaculty" }] },
      ],
    });
    const respondedRequests = faculty.respondedRequests;
    for (let r in requests) {
      if (respondedRequests.includes(requests[r]._id)) {
        requests[r].new = false;
      }
    }
    res.status(200).json({
      status: "success",
      requested: req.requestTime,
      data: {
        message: "redirect to /facultyDetails",
        requests,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "failed",
      messsage: err,
    });
  }
};

module.exports.sendBackPendingRequest = async (req, res) => {
  try {
    const {id } = req.params;
    const request = await Request.findById(req.body.id);
    ///const comments = req.body.comments;
    if (request.status === "sentByClub" ) {  
      const faculty = await Faculty.findById(id);
      faculty.respondedRequests.push(req.body.id);
      await faculty.save();
    }
    await Request.findByIdAndUpdate(req.body.id, {
      status: "sentByFaculty",
      //comments,
    });
    const sentRequest = await Request.findById(req.body.id);
    res.status(200).json({
      status: "success",
      requested: req.requestTime,
      data: {
        message: "redirect to /pendingRequests",
        sentRequest,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "failed",
      messsage: err,
    });
  }
};

module.exports.approvePendingRequest = async (req, res) => {
  try {
    const {id } = req.params; 
    const request = await Request.findById(req.body.id);
    //const comments = req.body.comments;
    if (request.status === "sentByClub") {
      const faculty = await Faculty.findById(id);
      faculty.respondedRequests.push(request._id);
      faculty.save();
    }
    request.status = "approvedByFaculty"
    request.facultyId = req.params.id;
    request.timeline.approvedByFaculty = { date: getDate(), time: getTime() };
    await request.save();
    //const appRequest = await Request.findById(req.body._id);
    res.status(200).json({
      status: "success",
      requested: req.requestTime,
      data: {
        message: "redirect to /pendingRequests",
  
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "failed",
      messsage: err,
    });
  }
};

module.exports.rejectPendingRequest = async (req, res) => {
  try {
    const {id } = req.params;
    const request = await Request.findById(req.body.id);
    //const comments = req.body.comments;
    if (request.status === "sentByClub") {
      const faculty = await Faculty.findById(id);
      faculty.respondedRequests.push(request._id);
      faculty.save();
    }
    await Request.findByIdAndUpdate(req.body.id, {
      status: "rejectedByFaculty",
      // comments,
    });
    // const rejRequest = await Request.findById(req.body._id);
    res.status(200).json({
      status: "success",
      requested: req.requestTime,
      data: {
        message: "redirect to /pendingRequests",
        // rejRequest,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "failed",
      messsage: err,
    });
  }
};

/////////////////////////////////////////////////////////////////////////ROUTE: /respondedRequests
module.exports.getRespondedRequests = async (req, res) => {
  try {
    const { id } = req.params;
    const faculty = await Faculty.findById(id);
    const requestIds = faculty.respondedRequests;
    const requests = await Request.find({ _id: [...requestIds] });
    res.status(200).json({
      status: "success",
      requested: req.requestTime,
      data: {
        requests,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "failed",
      messsage: err,
    });
  }
};


////////////////////////////////////////////////////////////////////ROUTE: /changePassword
module.exports.authorise = async (req, res) => {
  const { id } = req.params;
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    if (!oldPassword || !newPassword || !confirmPassword) {
      res.status(401).json({
        status: "unauthorized",
        requested: req.requestTime,
        message: "Please provide old and new password",
      });
      return;
    }
    const faculty = await Faculty.findById(id).select("+password");
    if (await faculty.correctPassword(oldPassword, faculty.password)) {
      if (newPassword === confirmPassword) {
        const faculty = await Faculty.findById(id);
        faculty.password = newPassword;
        await faculty.save();
        res.status(200).json({
          status: "success",
          requested: req.requestTime,
          message: "redirect to home page",
        });
        return;
      } else {
        res.status(400).json({
          status: "failed",
          requested: req.requestTime,
          message: "passwords don't match",
        });
        return;
      }
    } else {
      res.status(401).json({
        status: "unauthorized",
        requested: req.requestTime,
        message: "incorrect password",
      });
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "failed",
      messsage: err,
    });
  }
};

////////////////////////////////////////Route: /getRejectedRequests
module.exports.getRejectedRequests = async (req, res) => {
  try {
    const facultyId = req.params.id;
    const faculty = await Faculty.findById(facultyId);
    const clubIds = faculty.facultyClubs;
    const rejectedRequests = await Request.find({
      $and: [
        { clubId: { $in: clubIds } },
        { status: {
            $in: [
              "rejectedByFaculty",
              "rejectedByFinance",
              "rejectedByDean",
            ],
          },
        },
      ],
    });
    res.status(200).json({
      status: "success",
      data: {
        rejectedRequests,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

////////////////////////////////////////Route: /getApprovedRequests
module.exports.getApprovedRequests = async (req, res) => {
  try {
    const facutlyId = req.params.id;
    const faculty = await Faculty.findById(facutlyId);
    const clubIds = faculty.facultyClubs;
    const approvedRequests = await Request.find({
      $and: [{ clubId: { $in: clubIds } }, { status: ["approvedByDean"] }],
    });
    res.status(200).json({
      status: "success",
      data: {
        approvedRequests,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};