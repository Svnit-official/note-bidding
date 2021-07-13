const Faculty = require("./../models/facultyModel");
const Request = require("./../models/requestModel");
// const jwt = require("jsonwebtoken");
// const secret = process.env.SECRET || "this-is-my-faculty-secret";
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
      message: "Faculty Login Page",
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
    const foundFaculty = await Faculty.findOne({ username }).select("+password");
    const flag = await foundFaculty.correctPassword(password, foundFaculty.password);
    if (flag == true) {
      req.session.user_id = foundFaculty._id;
      console.log("loggedIn");
      res.status(200).json({
        status: "success",
        requested: req.time,
        message: "authorised",
        clubID: foundFaculty._id,
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

///////////////////////////////////////////////////////////////////ROUTE: /facultyDetails
module.exports.getDetailsById = async (req, res) => {
  try {
    const facultyDetails = await Faculty.findById(req.session.user_id);
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
    const facultyDetailsOld = await Faculty.findById(req.session.user_id);
    const facultyDetailsNew = await Faculty.findByIdAndUpdate(
      req.session.user_id,
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

////////////////////////////////////////////////////////////////ROUTE: /pendingRequests
module.exports.getPendingRequests = async (req, res) => {
  try {
    const requests = await Request.find({
      $or: [{ status: "sentByClub" }, { status: "receivedByFaculty" }],
    });
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
    const request = await Request.findById(req.body._id);
    const comments = req.body.comments;
    if (request.status === "sentByClub") {
      const faculty = await Faculty.findById(req.session.user_id);
      const respondedRequests = faculty.respondedRequests;
      respondedRequests.push(request);
      await Faculty.findByIdAndUpdate(req.session.user_id, { respondedRequests });
    }
    await Request.findByIdAndUpdate(req.body._id, {
      status: "sentByFaculty",
      comments,
    });
    const sentRequest = await Request.findById(req.body._id);
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
    const request = await Request.findById(req.body._id);
    const comments = req.body.comments;
    if (request.status === "sentByClub") {
      const faculty = await Faculty.findById(req.session.user_id);
      const respondedRequests = faculty.respondedRequests;
      respondedRequests.push(request);
      await Faculty.findByIdAndUpdate(req.session.user_id, { respondedRequests });
    }
    await Request.findByIdAndUpdate(req.body._id, {
      status: "approvedByFaculty",
      comments,
    });
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
      const faculty = await Faculty.findById(req.session.user_id);
      const respondedRequests = faculty.respondedRequests;
      respondedRequests.push(request);
      await Faculty.findByIdAndUpdate(req.session.user_id, { respondedRequests });
    }
    await Request.findByIdAndUpdate(req.body._id, {
      status: "rejectedByFaculty",
      comments,
    });
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

/////////////////////////////////////////////////////////////////////////ROUTE: /respondedRequests
module.exports.getRespondedRequests = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.session.user_id);
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

//////////////////////////////////////////////////////////////////////ROUTE: /logout/
module.exports.logout = async (req, res) => {
  req.session= null;
  console.log("logged out");
  res.status(200).json({
    status: 'success',
    requested: req.requestTime,
    messaage: "logged out, redirect to home"
  })
  res.send("logged out");
}

////////////////////////////////////////////////////////////////////ROUTE: /changePassword
module.exports.changePassword = async (req, res) => {
  module.exports.dashboard = async (req, res) => {
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
}

module.exports.authorise = async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  const faculty = await Faculty.findById(req.session.user_id).select('+password');
  if (await faculty.correctPassword(oldPassword, newPassword)) {
    if (newPassword === confirmPassword) {
      await Faculty.findByIdAndUpdate(req.session.user_id, { newPassword })
      req.session = null;
      res.status(200).json({
        status: 'success',
        requested: req.requestTime,
        message: 'redirect to home page'
      });
    } else {
      res.status(400).json({
        status: 'failed',
        requested: req.requestTime,
        message: "passwords don't match"
      });
    }
  } else {
    res.status(401).json({
      status: 'unauthorized',
      requested: req.requestTime,
      message: 'incorrect password'
    });
  } 
}