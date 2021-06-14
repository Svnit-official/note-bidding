const Dean = require("./../models/chairpersonModel");
const Request = require("./../models/requestModel");

///////////////////////////ROUTE: login
module.exports.login= (req, res) => {
  //get request
  //login page
};

module.exports.login= (req, res) => {
  //post request
  //authenticate
  //redirect to dashboard
};

module.exports.dashboard= (req, res) => {
  //come here after authentication
};

/////////////////////////////////////ROUTE: deanDetails
module.exports.getDetailsById= (req, res) => {
  // get details
};
module.exports.updateDetailsById= (req, res) => {
  // update details
};
module.exports.deleteDetailsById= (req, res) => {
  // delete details
};

/////////////////////////////////ROUTE: pendingRequests
module.exports.getpendingRequests= (req, res) => {
  // get pending Requests
};
module.exports.postpendingRequests= (req, res) => {
  // post pending Requests
};
module.exports.updatependingRequests= (req, res) => {
  // update pending Requests
};
module.exports.deletependingRequests= (req, res) => {
  // delete pending Requests
};

//////////////////////////////////////Route: history
module.exports.getHistory= (req, res) => {
  // history
  // approved requests, rejected requests
};
