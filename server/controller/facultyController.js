const Faculty = require("./../models/facultyModel");
const Request = require("./../models/requestModel");

///////////////////////////ROUTE: login
module.exports.login= async (req, res) => {
  //get request
  //login page
};

module.exports.login= async (req, res) => {
  //post request
  //authenticate
  //redirect to dashboard
};

module.exports.dashboard= async (req, res) => {
  //come here after authentication
};

/////////////////////////////////////ROUTE: facultyDetails
module.exports.getDetailsById= async (req, res) => {
  // get details
};
module.exports.updateDetailsById= async (req, res) => {
  // update details
};
module.exports.deleteDetailsById= async (req, res) => {
  // delete details
};

/////////////////////////////////ROUTE: pendingRequests
module.exports.getpendingRequests= async (req, res) => {
  // get pending Requests
};
module.exports.postpendingRequests= async (req, res) => {
  // post pending Requests
};
module.exports.updatependingRequests= async (req, res) => {
  // update pending Requests
};
module.exports.deletependingRequests= async (req, res) => {
  // delete pending Requests
};

////////////////////////////////////ROUTE: sentRequests
module.exports.getSentRequests= async (req, res) => {
  // get sent requests
};
module.exports.deleteSentRequests= async (req, res) => {
  // delete sent requests
};

//////////////////////////////////////Route: history
module.exports.getHistory= async (req, res) => {
  // history
  // approved requests, rejected requests
};
