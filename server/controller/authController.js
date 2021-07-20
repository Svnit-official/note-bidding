const Faculty = require("./../models/facultyModel");
const Finance = require("./../models/financeModel");
const Dean = require("./../models/deanModel");
const Club = require("./../models/clubModel");

module.exports.isDeanLoggedIn = async (req, res, next) => {
  if (req.session.user_id && (await Dean.findById(req.session.user_id))) {
    console.log("the route is authorised!");
    next();
  } else {
    return res.status(401).json({
      status: "failed",
      message: "Please login to access this route",
    });
  }
};

module.exports.isClubLoggedIn = async (req, res, next) => {
  try {
    if (auth) {
      console.log("the route is authorised!");
      next();
    } else {
      return res.status(401).json({
        status: "failed",
        message: "Please login to access this route",
      });
    }
  } catch (err) {
    return res.status(401).json({
      status: "failed",
      message: err,
    });
  }
};

// const token = jwt.sign({email : existingUser.email , id : existingUser._id},'test',{expiresIn : "1h"});

// res.status(200).json({result : existingUser , token});

module.exports.isFacultyLoggedIn = async (req, res, next) => {
  if (req.session.user_id && (await Faculty.findById(req.session.user_id))) {
    console.log("the route is authorised!");
    next();
  } else {
    return res.status(401).json({
      status: "failed",
      message: "Please login to access this route",
    });
  }
};

module.exports.isFinanceLoggedIn = async (req, res, next) => {
  if (req.session.user_id && (await Finance.findById(req.session.user_id))) {
    console.log("the route is authorised!");
    next();
  } else {
    return res.status(401).json({
      status: "failed",
      message: "Please login to access this route",
    });
  }
};
