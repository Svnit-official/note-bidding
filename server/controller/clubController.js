const Club = require('./../models/clubModel');
const Request = require('./../models/requestModel');

///////////////////////////ROUTE: login
module.exports.login = async (req, res) => {
    //get request
    //login page
};

module.exports.authenticate= async (req, res) => {
    //post request
    //authenticate
    //redirect to dashboard
};

module.exports.dashboard= async (req, res) => {
    //come here after authentication
};

/////////////////////////////////////ROUTE: clubDetails
module.exports.getDetailsById= async (req, res) => {
    // get details
};
module.exports.updateDetailsById= async (req, res) => {
    // update details
};
module.exports.deleteDetailsById= async (req, res) => {
    // delete details
};


/////////////////////////////////ROUTE: drafts
module.exports.getDrafts= async (req, res) => {
    // drafts
};
module.exports.postDrafts= async (req, res) => {
    // post drafts
};
module.exports.updateDrafts= async (req, res) => {
    // update drafts
};
module.exports.deleteDrafts= async (req, res) => {
    // delet drafts
};

////////////////////////////////////ROUTE: sentRequests
module.exports.getSentRequests= async (req, res) => {
    // get sent requests
};
module.exports.deleteSentRequests= async (req, res) => {
    // delete sent requests
};

/////////////////////////////////////////ROUTE: receivedRequests
module.exports.getReceivedRequests= async (req, res) => {
    // get received requests
};
module.exports.deleteReceivedRequests= async (req, res) => {
    // delete received requests
};
module.exports.updateReceivedRequests= async (req, res) => {
    // update received requests
};
module.exports.postReceivedRequests = async (req, res) => {
    // post received requests
};

//////////////////////////////////////Route: history
module.exports.getHistory = async (req, res) => {
    // history 
    // approved requests, rejected requests
};

