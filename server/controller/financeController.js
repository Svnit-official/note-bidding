const Request = require("./../models/requestModel");
const Finance = require("../models/financeHead");

const mongodb = require("mongodb");
const jwt = require("jsonwebtoken");
// const fs = require("fs");
// const jwt = require("jsonwebtoken");
// const secret = process.env.SECRET || "this-is-my-finance-secret";
// const expires = process.env.EXPIRES || 1000;
// // const Faculty = require('./../models/facultyModel');
const bcrypt = require("bcryptjs");
// const signToken = function (id) {
//   return jwt.sign({ id }, secret, { expiresIn: expires });
// };

///////////////////////////////////////////////////////////////////ROUTE: /login
module.exports.login = async (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      requested: req.requestTime,
      message: "finance Login Page",
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
    const foundFinance = await Finance.findOne({ username });
    console.log(foundFinance);

    const flag = await bcrypt.compare(password, foundFinance.password);
    if (flag == true) {
      // req.session.user_id = foundFinance._id;
      const token = jwt.sign({ id: foundFinance._id }, "finance", {
        expiresIn: "2h",
      });
      console.log("loggedIn");
      res.status(200).json({
        status: "success",
        requested: req.time,
        message: "authorised",
        financeID: foundFinance._id,
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

///////////////////////////////////////////////////////////////////ROUTE: /financeDetails
module.exports.getDetailsById = async (req, res) => {
  try {
    const { id } = req.params;
    const financeDetails = await Finance.findById(id);
    res.status(200).json({
      status: "success",
      requested: req.requestTime,
      data: {
        financeDetails,
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
    const financeDetailsOld = await Finance.findById(id);
    const financeDetailsNew = req.body;
    await Finance.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      requested: req.requestTime,
      data: {
        message: "redirect to /financeDetails",
        financeDetailsOld,
        financeDetailsNew,
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
    const requests = await Request.find({ status: "approvedByFaculty" });
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

module.exports.sendBackPendingRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.body._id);
    const comments = req.body.comments;
    const finance = await Finance.findById(req.session.user_id);
    const respondedRequests = finance.respondedRequests;
    if (!respondedRequests.includes(req.body._id)) {
      respondedRequests.push(request);
      await Finance.findByIdAndUpdate(req.session.user_id, {
        respondedRequests,
      });
    }
    await Request.findByIdAndUpdate(req.body._id, {
      status: "sentByFinance",
      comments,
    });
    const sentRequest = await Request.findById(req.body._id);
    res.status(200).json({
      status: "success",
      requested: req.requestTime,
      data: {
        message: "redirect to /respondedRequests",
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
    const request = await Request.findById(req.body._id);
    const comments = req.body.comments;
    const finance = await Finance.findById(req.session.user_id);
    const respondedRequests = finance.respondedRequests;
    if (!respondedRequests.includes(req.body._id)) {
      respondedRequests.push(request);
      await Finance.findByIdAndUpdate(req.session.user_id, {
        respondedRequests,
      });
    }
    await Request.findByIdAndUpdate(req.body._id, {
      status: "approvedByFinance",
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
    const finance = await Finance.findById(req.session.user_id);
    const respondedRequests = finance.respondedRequests;
    if (!respondedRequests.includes(req.body._id)) {
      respondedRequests.push(request);
      await Finance.findByIdAndUpdate(req.session.user_id, {
        respondedRequests,
      });
    }
    await Request.findByIdAndUpdate(req.body._id, {
      status: "rejectedByFinance",
      comments,
    });
    const rejRequest = await Request.findById(req.body._id);
    res.status(200).json({
      status: "success",
      requested: req.requestTime,
      data: {
        message: "redirect to /respondedRequests",
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
    const finance = await Finance.findById(req.session.user_id);
    const requestIds = finance.respondedRequests;
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

//////////////////////////////////////////////////////////////////////ROUTE: /logout/
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
    const { oldPassword, newPassword, confirmPassword } = req.body;
    if (!oldPassword || !newPassword || !confirmPassword) {
      res.status(401).json({
        status: "unauthorized",
        requested: req.requestTime,
        message: "Please provide old and new password",
      });
      return;
    }
    const finance = await Finance.findById(req.session.user_id).select(
      "+password"
    );
    if (await finance.correctPassword(oldPassword, finance.password)) {
      if (newPassword === confirmPassword) {
        await Finance.findByIdAndUpdate(req.session.user_id, { newPassword });
        req.session.user_id = null;
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
