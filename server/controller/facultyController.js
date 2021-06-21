const Faculty = require("./../models/facultyModel");
const Request = require("./../models/requestModel");

///////////////////////////////////////////////////////////////////ROUTE: /login
module.exports.login = async (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      requested: req.requestTime,
      message: "Faculty Login Page"
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "failed",
      messsage: err,
    });
  }
};

module.exports.authentication= async (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      requested: req.requestTime,
      message : "post request for authentication"
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
module.exports.dashboard= async (req, res) => {
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

///////////////////////////////////////////////////////////////////ROUTE: /:id/facultyDetails
module.exports.getDetailsById = async (req, res) => {
  try {
    const facultyDetails = await Faculty.findById(req.params.id);
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
    const facultyDetailsOld = await Faculty.findById(req.params.id);
    const facultyDetailsNew = await Faculty.findByIdAndUpdate(
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

////////////////////////////////////////////////////////////////ROUTE: /:id/pendingRequests
module.exports.getPendingRequests= async (req, res) => {
  try {
    const requests = await Request.find({
      $or: [
        { status: "sentByClub" },
        { status: "receivedByFaculty"}
      ]
    });
    res.status(200).json({
      status: "success",
      requested: req.requestTime,
      data: {
        message: "redirect to /facultyDetails",
        requests
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
    if (request.status === 'sentByClub') {
      const faculty = await Faculty.findById(req.params.id);
      const respondedRequests = faculty.respondedRequests;
      respondedRequests.push(request);
      await Faculty.findByIdAndUpdate(req.params.id, { respondedRequests });
    }
    await Request.findByIdAndUpdate(req.body._id, { status: 'sentByFaculty', comments });
    const sentRequest = await Request.findById(req.body._id);
    res.status(200).json({
      status: "success",
      requested: req.requestTime,
      data: {
        message: "redirect to /pendingRequests",
        sentRequest
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
    if (request.status === "sentByClub") {
      const faculty = await Faculty.findById(req.params.id);
      const respondedRequests = faculty.respondedRequests;
      respondedRequests.push(request);
      await Faculty.findByIdAndUpdate(req.params.id, { respondedRequests });
    }
    await Request.findByIdAndUpdate(req.body._id, { status: "approvedByFaculty", comments });
    const appRequest = await Request.findById(req.body._id);
    res.status(200).json({
      status: "success",
      requested: req.requestTime,
      data: {
        message: "redirect to /pendingRequests",
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
    if (request.status === "sentByClub") {
      const faculty = await Faculty.findById(req.params.id);
      const respondedRequests = faculty.respondedRequests;
      respondedRequests.push(request);
      await Faculty.findByIdAndUpdate(req.params.id, { respondedRequests });
    }
    await Request.findByIdAndUpdate(req.body._id, { status: "rejectedByFaculty", comments });
    const rejRequest = await Request.findById(req.body._id);
    res.status(200).json({
      status: "success",
      requested: req.requestTime,
      data: {
        message: "redirect to /pendingRequests",
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
module.exports.getRespondedRequests= async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
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

// module.exports.deleteSentRequests = async (req, res) => {
//   // delete sent requests
// };

