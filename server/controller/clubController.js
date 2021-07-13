const Club = require("./../models/clubModel");
const Request = require("./../models/requestModel");
// const jwt = require("jsonwebtoken");
// const secret = process.env.SECRET || "this-is-my-secret";
// const expires = process.env.EXPIRES || 100000;
// const Faculty = require('./../models/facultyModel');

// const signToken = function (id) {
//   return jwt.sign({ id }, secret, { expiresIn: expires });
// };

//////////////////////////////////////////////////////////////////////////////ROUTE: /login
module.exports.login = async (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      requested: req.requestTime,
      message: "Club Login Page",
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
    const foundClub = await Club.findOne({ username }).select('+password');
    const flag = await foundClub.correctPassword(password, foundClub.password);
    if (flag == true) {
      req.session.user_id = foundClub._id;
      console.log("loggedIn");
      res.status(200).json({
        status: "success",
        requested: req.time,
        message: "authorised",
        clubID: foundClub._id,
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
      status: 'failed',
      message: err,
    })
  }
};

////////////////////////////////////////////////////////////////////////////////ROUTE: /
module.exports.dashboard = async (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      requested: req.requestTime,
      message: `dashboard for club id :${req.userId}`, //:${req.session.user_id}`
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "failed",
      messsage: err,
    });
  }
};

/////////////////////////////////////////////////////////////////////////////ROUTE: /clubDetails
module.exports.getDetailsById = async (req, res) => {
  try {
    const clubDetails = await Club.findById(req.session.user_id);
    res.status(200).json({
      status: "success",
      requested: req.requestTime,
      data: {
        clubDetails,
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
    const clubDetailsOld = await Club.findById(req.session.user_id);
    const clubDetailsNew = await Club.findByIdAndUpdate(
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
        message: "redirect to /clubDetails",
        clubDetailsOld,
        clubDetailsNew,
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

// ///////////////////////////////////////////////////////////////////////////////ROUTE: /drafts
module.exports.getDrafts = async (req, res) => {
  try {
    const drafts = await Request.find({
      $and: [
        { clubId: req.session.user_id },
        { $or: [{ status: "draft" }, { status: "correctedDraft" }] },
      ],
    });
    res.status(200).json({
      status: "success",
      requested: req.requestTime,
      data: {
        drafts,
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

module.exports.postDraft = async (req, res) => {
  try {
    const request = req.body;
    if (
      request.status === "sentByFaculty" ||
      request.status === "sentByFinance"
    )
      request.status = "correctedDraft";
    else await Request.create(request);
    res.status(200).json({
      status: "success",
      requested: req.requestTime,
      data: {
        message: "redirect to /getDrafts",
        draftedRequest: request,
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

module.exports.deleteRequest = async (req, res) => {
  try {
    const request = req.body;
    if (request.status === "sentByClub") {
      const clubDetails = await Club.findById(req.session.user_id);
      const sentRequests = clubDetails.sentRequests.pull(request._id);
      await Club.findByIdAndUpdate(req.session.user_id, { sentRequests });
    }
    await Request.findByIdAndDelete(req.body._id);
    res.status(200).json({
      status: "success",
      requested: req.requestTime,
      data: {
        message:
          "redirect to the page from where the request was called (req.body.status)",
        deletedRequest: request,
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

//////////////////////////////////////////////////////////////////////////////////ROUTE: /sentRequests
module.exports.getSentRequests = async (req, res) => {
  try {
    const clubDetails = await Club.findById(req.session.user_id);
    const requestIds = clubDetails.sentRequests;
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

module.exports.sendRequest = async (req, res) => {
  // try {
  //   const request = req.body;
  //   const clubDetails = await Club.findById(req.session.user_id);
  //   if (
  //     request.status === "sentByFaculty" ||
  //     request.status === "sentByFinance" ||
  //     request.status === "correctedDraft"
  //   ) {
  //     await Request.findByIdAndUpdate(request._id, {
  //       status: "receivedByFaculty",
  //     });
  //   } else {
  //     await Request.findByIdAndUpdate(request._id, {
  //       status: "sentByClub",
  //     });
  //     const sentRequests = clubDetails.sentRequests;
  //     sentRequests.push(request);
  //     await Club.findByIdAndUpdate(req.session.user_id, { sentRequests });
  //   }
  const sentRequest = Request.findById(req.session.user_id);
  const { headName, eventName, eventDate, comments, pdf } = req.body;
  const clubDetails = await Club.findById(req.session.user_id);
  const newRequest = new Request({
    clubName: clubDetails.clubName,
    headName,
    eventName,
    eventDate,
    comments,
    pdf,
  });
  await newRequest.save();
  clubDetails.sentRequests.push(newRequest._id);
  await clubDetails.save();
  console.log("successful");
  res.status(200).json({
    status: "success",
    requested: req.requestTime,
    data: {
      message: "flash of message sent, redirect to /sentRequests",
    },
  });
}
  // } catch (err) {
  //   console.log(err);
  //   res.status(404).json({
  //     status: "failed",
  //     messsage: err,
  //   });
  // }
//};

// /////////////////////////////////////////////////////////////////////////////ROUTE: /receivedRequests
module.exports.getReceivedRequests = async (req, res) => {
  try {
    const receivedRequests = await Request.find({
      $and: [
        { clubId: req.session.user_id },
        { $or: [{ status: "sentByFaculty" }, { status: "sentByFinance" }] },
      ],
    });
    res.status(200).json({
      status: "success",
      requested: req.requestTime,
      data: {
        receivedRequests,
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

/////////////////////////////////////////////////////////////////////////////////ROUTE: /req/
module.exports.newRequest = async (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      requested: req.requestTime,
      data: {
        message: "page to fill body to create new request",
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

module.exports.deleteRequest = async (req, res) => {
  try {
    const request = await Request.findByIdAndDelete(req.params.reqid);
    const clubDetails = await Club.findById(req.session.user_id);
    clubDetails[`${request.status}`].pull(req.params.reqid);
    await Club.findByIdAndUpdate(req.session.user_id, clubDetails, {
      new: true,
      runValidators: true,
    });
    const requestsNew = await Request.find({
      _id: [...clubDetails[`${request.status}`]],
    });
    res.status(200).json({
      status: "success",
      requested: req.requestTime,
      data: {
        [`${request.status}`]: requestsNew,
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
  const club = await Club.findById(req.session.user_id).select('+password');
  if (await club.correctPassword(oldPassword, newPassword)) {
    if (newPassword === confirmPassword) {
      await Club.findByIdAndUpdate(req.session.user_id, { newPassword })
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