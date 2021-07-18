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
    const foundClub = await Club.findOne({ username }).select("+password");
    const flag = await foundClub.correctPassword(password, foundClub.password);
    if (flag == true) {
      const token = jwt.sign({id : foundClub._id},'club',{expiresIn : "2h"});
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
    await Club.findByIdAndUpdate(req.session.user_id, clubDetailsNew, {
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
    if (req.files) {
      const requestFile = req.files.pdf;
      requestFile.data = mongodb.Binary(requestFile.data);
      const date = getDate();
      requestFile.name = `${req.body.clubName}_${req.body.eventName}_${date}.pdf`;
      request.pdf = requestFile;
    }
    if (request._id) {
      if (
        request.status === "sentByFaculty" ||
        request.status === "sentByFinance" ||
        request.status === "correctedDraft"
      )
        request.status = "correctedDraft";
      await Request.findByIdAndUpdate(request._id, request);
    } else {
      await Request.create(request);
    }
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
  //req.body should contain _id if its an old request, status of the request
  try {
    console.log("kch kehna hai");
    const request = req.body;
    // console.log(request);
    const clubDetails = await Club.findById(request.club_id);
    request.clubName = clubDetails.clubName;
    console.log(request.pdf);
    // if(request.pdf){
    //   const requestFile = request.pdf;
    //   requestFile.data = mongodb.Binary(requestFile.data);
    //   const date = getDate();
    //   requestFile.name = `${request.clubName}_${request.eventName}_${date}.pdf`;
    //   request.pdf = requestFile;
    // }

    if (request._id) {
      if (
        request.status === "sentByFaculty" ||
        request.status === "sentByFinance" ||
        request.status === "correctedDraft" ) 
              request.status = "receivedByFaculty";
      else {
        request.status = "sentByClub";
      }
      await Request.findByIdAndUpdate(request._id, request);
    } else {
      await Request.create(request);
    }

    const sentRequests = clubDetails.sentRequests;
    sentRequests.push(request._id);
    await Club.findByIdAndUpdate(request.club_id, { sentRequests });

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
module.exports.logout = (req, res) => {
  req.session.user_id = null;
  console.log("logged out");
  res.status(200).json({
    status: "success",
    requested: req.requestTime,
    messaage: "logged out, redirect to home",
  });
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
    const club = await Club.findById(req.session.user_id).select("+password");
    if (await club.correctPassword(oldPassword, club.password)) {
      if (newPassword === confirmPassword) {
        await Club.findByIdAndUpdate(req.session.user_id, { newPassword });
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

// //////////////////////////////////////////////////////
module.exports.downloadPdf = async (req, res) => {
  try {
    const id = req.body.id;
    const request = Request.findById(id);
    const buffer = request.pdf.data.buffer;
    const name = request.pdf.name;
    fs.writeFileSync(name, buffer);
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
