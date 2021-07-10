const Finance = require("./../models/financeModel");
const Request = require("./../models/requestModel");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET || "this-is-my-finance-secret";
const expires = process.env.EXPIRES || 1000;
// const Faculty = require('./../models/facultyModel');

const signToken = function (id) {
  return jwt.sign({ id }, secret, { expiresIn: expires });
};

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
    if (!username || !password) {
      res.status(400).json({
        status: "bad request",
        requested: req.time,
        message: "please provide username and password",
      });
      return;
    }
    const foundFinance = await Finance.findOne({ username }).select("+password");
    if (
      foundFinance &&
      (await foundFinance.correctPassword(password, foundFinance.password))
    ) {
      const token = signToken(foundFinance._id);
      res.status(200).json({
        status: "success",
        requested: req.time,
        message: "authorised",
        clubID: foundFinance._id,
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
      messsage: err,
    });
  }
};

//////////////////////////////////////////////////////////////////////ROUTE: /:id
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

///////////////////////////////////////////////////////////////////ROUTE: /:id/financeDetails
module.exports.getDetailsById = async (req, res) => {
  try {
    const financeDetails = await Finance.findById(req.params.id);
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
    const financeDetailsOld = await Finance.findById(req.params.id);
    const financeDetailsNew = await Finance.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
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

////////////////////////////////////////////////////////////////ROUTE: /:id/pendingRequests
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
    const finance = await Finance.findById(req.params.id);
    const respondedRequests = finance.respondedRequests;
    if (!respondedRequests.includes(req.body._id)) {
      respondedRequests.push(request);
      await Finance.findByIdAndUpdate(req.params.id, { respondedRequests });  
    }
    await Request.findByIdAndUpdate(req.body._id, { status: "sentByFinance", comments });
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
    const finance = await Finance.findById(req.params.id);
    const respondedRequests = finance.respondedRequests;
    if (!respondedRequests.includes(req.body._id)) {
      respondedRequests.push(request);
      await Finance.findByIdAndUpdate(req.params.id, { respondedRequests });  
    }
    await Request.findByIdAndUpdate(req.body._id, { status: "approvedByFinance", comments });
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
    const finance = await Finance.findById(req.params.id);
    const respondedRequests = finance.respondedRequests;
    if (!respondedRequests.includes(req.body._id)) {
      respondedRequests.push(request);
      await Finance.findByIdAndUpdate(req.params.id, { respondedRequests });  
    }
    await Request.findByIdAndUpdate(req.body._id, { status: "rejectedByFinance", comments });
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

/////////////////////////////////////////////////////////////////////////ROUTE: /:id/respondedRequests
module.exports.getRespondedRequests = async (req, res) => {
  try {
    const finance = await Finance.findById(req.params.id);
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
