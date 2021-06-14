const Faculty = require("./../models/facultyModel");
const Request = require("./../models/request");

///////////////////////////ROUTE: login
exports.login(req, (res) => {
  //get request
  //login page
});

exports.login(req, (res) => {
  //post request
  //authenticate
  //redirect to dashboard
});

exports.dashboard(req, (res) => {
  //come here after authentication
});

/////////////////////////////////////ROUTE: facultyDetails
exports.getDetailsById(req, (res) => {
  // get details
});
exports.updateDetailsById(req, (res) => {
  // update details
});
exports.deleteDetailsById(req, (res) => {
  // delete details
});

/////////////////////////////////ROUTE: pendingRequests
exports.getpendingRequests(req, (res) => {
  // get pending Requests
});
exports.postpendingRequests(req, (res) => {
  // post pending Requests
});
exports.updatependingRequests(req, (res) => {
  // update pending Requests
});
exports.deletependingRequests(req, (res) => {
  // delete pending Requests
});

////////////////////////////////////ROUTE: sentRequests
exports.getSentRequests(req, (res) => {
  // get sent requests
});
exports.deleteSentRequests(req, (res) => {
  // delete sent requests
});

//////////////////////////////////////Route: history
exports.getHistory(req, (res) => {
  // history
  // approved requests, rejected requests
});
