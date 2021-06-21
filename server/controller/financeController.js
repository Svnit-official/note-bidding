const Finance = require("./../models/financeModel");
const Request = require("./../models/requestModel");

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
    const requests = Request.find({ status: "approvedByFaculty" });
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

module.exports.sendBackPendingRequests = async (req, res) => {
  try {
    const request = req.body;
    const comments = req.body.comments;
    const finance = await Finance.findById(req.params.id);
    const respondedRequests = finance.respondedRequests;
    if (!respondedRequests.includes(req.body._id)) {
      respondedRequests.push(request);
      await Finance.findByIdAndUpdate(req.params.id, { respondedRequests });  
    }
    Request.findByIdAndUpdate(req.body.id, { status: "sentByFinance", comments });
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

module.exports.approvePendingRequest = async (req, res) => {
  try {
    const request = req.body;
    const comments = req.body.comments;
    const finance = await Finance.findById(req.params.id);
    const respondedRequests = finance.respondedRequests;
    if (!respondedRequests.includes(req.body._id)) {
      respondedRequests.push(request);
      await Finance.findByIdAndUpdate(req.params.id, { respondedRequests });  
    }
    Request.findByIdAndUpdate(req.body.id, { status: "approvedByFinance", comments });
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
    const finance = await Finance.findById(req.params.id);
    const respondedRequests = finance.respondedRequests;
    if (!respondedRequests.includes(req.body._id)) {
      respondedRequests.push(request);
      await Finance.findByIdAndUpdate(req.params.id, { respondedRequests });  
    }
    Request.findByIdAndUpdate(req.body.id, { status: "rejectedByFinance", comments });
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

/////////////////////////////////////////////////////////////////////////ROUTE: /:id/respondedRequests
module.exports.getRespondedRequests = async (req, res) => {
  try {
    const finance = await Finance.findById(req.params.id);
    const requestIds = finance.respondedRequests;
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
