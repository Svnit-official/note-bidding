const Dean = require("./../models/deanModel");
const Request = require("./../models/requestModel");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET || "this-is-my-dean-secret";
const expires = process.env.EXPIRES || 1000;

const signToken = function (id) {
  return jwt.sign({ id }, secret, { expiresIn: expires });
};
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
    if (!username || !password) {
      res.status(400).json({
        status: "bad request",
        requested: req.time,
        message: "please provide username and password",
      });
      return;
    }
    const foundDean = await Dean.findOne({ username }).select("+password");
    if (
      foundDean &&
      (await foundDean.correctPassword(password, foundDean.password))
    ) {
      const token = signToken(foundDean._id);
      res.status(200).json({
        status: "success",
        requested: req.time,
        message: "authorised",
        clubID: foundDean._id,
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

///////////////////////////////////////////////////////////////////ROUTE: /:id/deanDetails
module.exports.getDetailsById = async (req, res) => {
  try {
    console.log('hello')
    const deanDetails = await Dean.findById(req.params.id);
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
    const deanDetailsOld = await Dean.findById(req.params.id);
    const deanDetailsNew = await Dean.findByIdAndUpdate(
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

////////////////////////////////////////////////////////////////ROUTE: /:id/pendingRequests
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
    const dean = await Dean.findById(req.params.id);
    const respondedRequests = dean.respondedRequests;
    respondedRequests.push(request);
    await Dean.findByIdAndUpdate(req.params.id, { respondedRequests });
    await Request.findByIdAndUpdate(req.body._id, { status: "approvedByDean", comments });
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
    const dean = await Dean.findById(req.params.id);
    const respondedRequests = dean.respondedRequests;
    respondedRequests.push(request);
    await Dean.findByIdAndUpdate(req.params.id, { respondedRequests });
    await Request.findByIdAndUpdate(req.body._id, { status: "rejectedByDean", comments});
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

/////////////////////////////////////////////////////////////////////////ROUTE: /:id/respondedRequests
module.exports.getRespondedRequests = async (req, res) => {
  try {
    const dean = await Dean.findById(req.params.id);
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
