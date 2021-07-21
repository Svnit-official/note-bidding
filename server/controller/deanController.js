const Dean = require("./../models/deanModel");
const Request = require("./../models/requestModel");
const mongodb = require("mongodb");
const jwt = require("jsonwebtoken");
// const fs = require("fs");
// const jwt = require("jsonwebtoken");
// const secret = process.env.SECRET || "this-is-my-dean-secret";
// const expires = process.env.EXPIRES || 1000;
// const bcrypt = require("bcryptjs");
// const signToken = function (id) {
//   return jwt.sign({ id }, secret, { expiresIn: expires });
// };
///////////////////////////////////////////////////////////////////ROUTE: /login
module.exports.login = async (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      requested: req.requestTime,
      message: "Dean Login Page",
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "failed",
      messsage: err,
    });
  }
};

module.exports.authentication = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    if (!username || !password) {
      res.status(400).json({
        status: "bad request",
        requested: req.time,
        message: "please provied username and password",
      });
    }
    const foundDean = await Dean.findOne({ username }).select("+password");
    const flag = await foundDean.correctPassword(password, foundDean.password);
    if (flag == true) {
      // req.session.user_id = foundDean._id;
      const token = jwt.sign({ id: foundDean._id }, "dean", {
        expiresIn: "2h",
      });
      console.log("loggedIn");
      res.status(200).json({
        status: "success",
        requested: req.time,
        message: "authorised",
        deanID: foundDean._id,
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

//////////////////////////////////////////////////////////////////////ROUTE: /
module.exports.dashboard = async (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      requested: req.requestTime,
      message: "dashboard",
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "failed",
      messsage: err,
    });
  }
};

///////////////////////////////////////////////////////////////////ROUTE: /deanDetails
module.exports.getDetailsById = async (req, res) => {
  try {
    console.log("hello");
    const { id } = req.params;
    const deanDetails = await Dean.findById(id);
    console.log(deanDetails);
    res.status(200).json({
      status: "success",
      requested: req.requestTime,
      data: {
        deanDetails,
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
    const deanDetailsOld = await Dean.findById(id);
    const deanDetailsNew = req.body;
    await Dean.findByIdAndUpdate(id, deanDetailsNew);
    res.status(200).json({
      status: "success",
      requested: req.requestTime,
      data: {
        message: "redirect to /deanDetails",
        deanDetailsOld,
        deanDetailsNew,
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
    const requests = await Request.find({ status: "approvedByFinance" });
    res.status(200).json({
      status: "success",
      requested: req.requestTime,
      data: {
        message: "redirect to /pendingRequests",
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

module.exports.approvePendingRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.body._id);
    const comments = req.body.comments;
    const dean = await Dean.findById(req.session.user_id);
    const respondedRequests = dean.respondedRequests;
    respondedRequests.push(request);
    await Dean.findByIdAndUpdate(req.session.user_id, { respondedRequests });
    await Request.findByIdAndUpdate(req.body._id, {
      status: "approvedByDean",
      comments,
    });
    const appRequest = await Request.findById(req.body._id);
    res.status(200).json({
      status: "success",
      requested: req.requestTime,
      data: {
        message: "redirect to /respondedRequests",
        appRequest,
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
    const request = await Request.findById(req.body._id);
    const comments = req.body.comments;
    const dean = await Dean.findById(req.session.user_id);
    const respondedRequests = dean.respondedRequests;
    respondedRequests.push(request);
    await Dean.findByIdAndUpdate(req.session.user_id, { respondedRequests });
    await Request.findByIdAndUpdate(req.body._id, {
      status: "rejectedByDean",
      comments,
    });
    const rejRequest = await Request.findById(req.body._id);
    res.status(200).json({
      status: "success",
      requested: req.requestTime,
      data: {
        message: "redirect to /rejectedRequests",
        rejRequest,
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
    const dean = await Dean.findById(req.session.user_id);
    const requestIds = dean.respondedRequests;
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

// module.exports.deleteSentRequests = async (req, res) => {
//   // delete sent requests
// };

//////////////////////////////////////////////////////////////////////ROUTE: /logout
module.exports.logout = async (req, res) => {
  req.session.user_id = null;
  console.log("logged out");
  res.status(200).json({
    status: "success",
    requested: req.requestTime,
    messaage: "logged out, redirect to home",
  });
  res.send("logged out");
};

////////////////////////////////////////////////////////////////////ROUTE: /changePassword
module.exports.changePassword = async (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      requested: req.requestTime,
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

module.exports.authorise = async (req, res) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword, confirmPassword } = req.body;
    if (!oldPassword || !newPassword || !confirmPassword) {
      res.status(401).json({
        status: "unauthorized",
        requested: req.requestTime,
        message: "Please provide old and new password",
      });
      return;
    }
    const dean = await Dean.findById(id).select("+password");
    if (await dean.correctPassword(oldPassword, dean.password)) {
      if (newPassword === confirmPassword) {
        const dean = await Dean.findById(id);
        dean.password = newPassword;
        await dean.save();
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
    const rejectedRequests = await Request.find({
      status: "rejectedByDean",
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
