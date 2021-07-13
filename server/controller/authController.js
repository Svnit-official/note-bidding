const Faculty = require("./../models/facultyModel");
const Finance = require("./../models/FinanceModel");
const Dean = require("./../models/deanModel");
const Club = require("./../models/clubModel");

module.exports.isDeanLoggedIn = async (req, res, next) => {
  if (req.session.user_id && (await Dean.findById(req.session.user_id))) {
    next();
  } else {
    return next(
      res.status(401).json({
        status: "failed",
        message: "Please login to access this route",
      })
    );
  }
};

module.exports.isClubLoggedIn = async (req, res, next)=> {
  if(req.sessions.user_id && (await Club.findById(req.sessions.user_id))){
    next();
  } else {
    return next(
      res.status(401).json({
        status: "failed",
        message: "Please login to access this route",
      })
    );
  }
};

module.exports.isFacultyLoggedIn = async (req, res, next) => {
  if (req.session.user_id && (await Faculty.findById(req.session.user_id))) {
    next();
  } else {
    return next(
      res.status(401).json({
        status: "failed",
        message: "Please login to access this route",
      })
    );
  }
};

module.exports.isFinanceLoggedIn = async (req, res, next) => {
  if (req.session.user_id && (await Finance.findById(req.session.user_id))) {
    next();
  } else {
    return next(
      res.status(401).json({
        status: "failed",
        message: "Please login to access this route",
      })
    );
  }
};
