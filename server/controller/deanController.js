const Dean = require("./../models/deanModel");
const Request = require("./../models/requestModel");

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

module.exports.authenticate = async (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      requested: req.requestTime,
      message: "post request for authentication",
    });
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
    const requests = Request.find({ status: "approvedByFinance" });
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
    const request = req.body;
    const comments = req.body.comments;
    const dean = await Dean.findById(req.params.id);
    const respondedRequests = dean.respondedRequests;
    respondedRequests.push(request);
    await Dean.findByIdAndUpdate(req.params.id, { respondedRequests });
    Request.findByIdAndUpdate(req.body.id, {
      status: "approvedByDean",
      comments,
    });
    res.status(200).json({
      status: "success",
      requested: req.requestTime,
      data: {
        message: "redirect to /respondedRequests",
        request,
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
    const request = req.body;
    const comments = req.body.comments;
    const dean = await Dean.findById(req.params.id);
    const respondedRequests = dean.respondedRequests;
    respondedRequests.push(request);
    await Dean.findByIdAndUpdate(req.params.id, { respondedRequests });
    Request.findByIdAndUpdate(req.body.id, {
      status: "rejectedByDean",
      comments,
    });
    res.status(200).json({
      status: "success",
      requested: req.requestTime,
      data: {
        message: "redirect to /rejectedRequests",
        request,
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
    const requests = Request.find({ _id: [...requestIds] });
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
