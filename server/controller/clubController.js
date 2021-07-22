const Club = require("./../models/clubModel");
const Request = require("./../models/requestModel");
const jwt = require("jsonwebtoken");
const mongodb = require("mongodb");
const fs = require("fs");

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
}

// const jwt = require("jsonwebtoken");
// const secret = process.env.SECRET || "this-is-my-secret";
// const expires = process.env.EXPIRES || 100000;
// const Faculty = require('./../models/facultyModel');

// const signToken = function (id) {
//   return jwt.sign({ id }, secret, { expiresIn: expires });
// };

//////////////////////////////////////////////////////////////////////////////ROUTE: /login
// module.exports.login = async (req, res) => {
//   try {
//     res.status(200).json({
//       status: "success",
//       requested: req.requestTime,
//       message: "Club Login Page",
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(404).json({
//       status: "failed",
//       messsage: err,
//     });
//   }
// };

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
    const foundClub = await Club.findOne({ username }).select("+password");
    if(foundClub && await foundClub.correctPassword(password, foundClub.password)){
      const token = jwt.sign({ id: foundClub._id }, "club", {
        expiresIn: "2h",
      });
      console.log("loggedIn, sent from clubController");
      res.status(200).json({
        user: foundClub,
        status: "success",
        requested: req.time,
        message: "authorised",
        clubID: foundClub._id,
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

////////////////////////////////////////////////////////////////////////////////ROUTE: /
// module.exports.dashboard = async (req, res) => {
//   try {
//     res.status(200).json({
//       status: "success",
//       requested: req.requestTime,
//       message: `dashboard for club id :${req.userId}`, //:${req.params.id}`
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(404).json({
//       status: "failed",
//       messsage: err,
//     });
//   }
// };

/////////////////////////////////////////////////////////////////////////////ROUTE: /clubDetails
module.exports.getDetailsById = async (req, res) => {
  try {
    const clubDetails = await Club.findById(req.params.id);
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
    const clubDetailsOld = await Club.findById(req.params.id);
    const clubDetailsNew = req.body;
    if (req.files.clubLogo) {
      clubDetailsNew.clubLogo = req.files.clubLogo;
      clubDetailsNew.clubLogo.data = mongodb.Binary(
        clubDetailsNew.clubLogo.data
      );
    }
    if (req.files.signature) {
      clubDetailsNew.signature = req.files.signature;
      clubDetailsNew.signature = mongodb.Binary(clubDetailsNew.signature.data);
    }
    await Club.findByIdAndUpdate(req.params.id, clubDetailsNew, {
      new: true,
      runValidators: true,
    });
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
module.exports.sendDraft = async (req, res) => {
  const { id } = req.params;
  const draft = await Request.findById(id);
  draft.status = "sentByClub";
  draft.timeline.sentByClub = { date: getDate(), time: getTime() };
  await draft.save();
  const clubID = draft.clubId;
  const club = await Club.findById(clubID);
  club.sentRequests.push(id);
  await club.save();
  res.status(200).json({
    status: "success",
    requested: req.requestTime,
    message: "redirect to /clubDetails",
  });
};
module.exports.deleteDraft = async (req, res) => {
  const { id } = req.params;
  await Request.findByIdAndDelete(id);
  res.status(200).json({
    status: "success",
    requested: req.requestTime,
    message: "redirect to /clubDetails",
  });
};
module.exports.updateDraft = async (req, res) => {
  const { id } = req.params;
  const { headName, eventName, eventDate, comments, pdf } = req.body;
  await Request.findByIdAndUpdate(id, req.body);
  res.status(200).json({
    status: "success",
    requested: req.requestTime,
    data: {
      message: "redirect to /drafts",
    },
  });
};
module.exports.getDrafts = async (req, res) => {
  try {
    const drafts = await Request.find({
      $and: [
        { clubId: req.params.id },
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
    console.log("draft posting");
    const club_id = req.params.id;
    const request = req.body;
    // console.log(request);
    const clubDetails = await Club.findById(club_id);
    request.clubName = clubDetails.clubName;
    // if(request.pdf){
    //   const requestFile = request.pdf;
    //   requestFile.data = mongodb.Binary(requestFile.data);
    //   const date = getDate();
    //   requestFile.name = `${request.clubName}_${request.eventName}_${date}.pdf`;
    //   request.pdf = requestFile;
    // }
    let newRequest = null;
    if (request._id) {
      if (
        request.status === "sentByFaculty" ||
        request.status === "sentByFinance" ||
        request.status === "correctedDraft"
      )
        request.status = "correctedDraft";
      else {
        request.status = "draft";
      }
      await Request.findByIdAndUpdate(request._id, request);
    } else {
      newRequest = await Request.create(request);
      newRequest.clubId = club_id;
      console.log(club_id);
      await newRequest.save();
    }
    console.log(newRequest);
    console.log("successful");
    res.status(200).json({
      status: "success",
      requested: req.requestTime,
      data: {
        message: "flash of message saved, redirect to /getDrafts",
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
      const clubDetails = await Club.findById(req.params.id);
      const sentRequests = clubDetails.sentRequests.pull(request._id);
      await Club.findByIdAndUpdate(req.params.id, { sentRequests });
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
  const { id } = req.params;
  try {
    const clubDetails = await Club.findById(id);
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
  try {
    const club_id = req.params.id;
    const request = req.body;
    request.clubId = club_id;
    const clubDetails = await Club.findById(club_id);
    request.clubName = clubDetails.clubName;
    // if(request.pdf){
    //   const requestFile = request.pdf;
    //   requestFile.data = mongodb.Binary(requestFile.data);
    //   const date = getDate();
    //   requestFile.name = `${request.clubName}_${request.eventName}_${date}.pdf`;
    //   request.pdf = requestFile;
    // }
    let newRequest = null;
    if (request._id) {
      if (
        request.status === "sentByFaculty" ||
        request.status === "sentByFinance" 
      )
        request.status = "receivedByFaculty";
      else {
        request.status = "sentByClub";
      }
      await Request.findByIdAndUpdate(request._id, request);
    } else {
      newRequest = await Request.create(request);
      newRequest.status = "sentByClub";
      newRequest.timeline.sentByClub = { date: getDate(), time: getTime() };
      await newRequest.save();
    }
    console.log(newRequest);
    const sentRequests = clubDetails.sentRequests;
    sentRequests.push(newRequest._id);
    await clubDetails.save();
    console.log("successful");
    res.status(200).json({
      status: "success",
      requested: req.requestTime,
      data: {
        message: "flash of message sent, redirect to /sentRequests",
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

// /////////////////////////////////////////////////////////////////////////////ROUTE: /receivedRequests
module.exports.getReceivedRequests = async (req, res) => {
  try {
    const receivedRequests = await Request.find({
      $and: [
        { clubId: req.params.id },
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

///////////////////////////////////////////////////////////////
// module.exports.newRequest = async (req, res) => {
//   try {
//     res.status(200).json({
//       status: "success",
//       requested: req.requestTime,
//       data: {
//         message: "page to fill body to create new request",
//       },
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(404).json({
//       status: "failed",
//       messsage: err,
//     });
//   }
// };

module.exports.deleteRequest = async (req, res) => {
  try {
    const request = await Request.findByIdAndDelete(req.params.reqid);
    const clubDetails = await Club.findById(req.params.id);
    clubDetails[`${request.status}`].pull(req.params.reqid);
    await Club.findByIdAndUpdate(req.params.id, clubDetails, {
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

// //////////////////////////////////////////////////////////////////////ROUTE: /logout/
// module.exports.logout = (req, res) => {
//   req.params.id = null;
//   console.log("logged out");
//   res.status(200).json({
//     status: "success",
//     requested: req.requestTime,
//     messaage: "logged out, redirect to home",
//   });
// };

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
    console.log(oldPassword, newPassword, confirmPassword);
    if (!oldPassword || !newPassword || !confirmPassword) {
      res.status(401).json({
        status: "unauthorized",
        requested: req.requestTime,
        message: "Please provide old and new password",
      });
      return;
    }
    const club = await Club.findById(id).select("+password");
    if (await club.correctPassword(oldPassword, club.password)) {
      if (newPassword === confirmPassword) {
        const club = await Club.findById(id);
        club.password = newPassword;
        await club.save();
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

// //////////////////////////////////////////////////////
// module.exports.downloadPdf = async (req, res) => {
//   try {
//     const id = req.body.id;
//     const request = Request.findById(id);
//     const buffer = request.pdf.data.buffer;
//     const name = request.pdf.name;
//     fs.writeFileSync(name, buffer);
//     res.status(200).json({
//       status: "success",
//       requested: req.requestTime,
//       message: "Page to change password",
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(404).json({
//       status: "failed",
//       messsage: err,
//     });
//   }
// };

////////////////////////////////////////Route: /getRejectedRequests
module.exports.getRejectedRequests = async (req, res) => {
  try {
    const clubId = req.params.id;
    const rejectedRequests = await Request.find({
      $and: [
        { clubId: clubId },
        {
          $or: [
            {
              status: {
                $in: [
                  "rejectedByFaculty",
                  "rejectedByFinance",
                  "rejectedByDean",
                ],
              },
            },
          ],
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
