const Club = require('./../models/clubModel');
const Request = require('./../models/request');

///////////////////////////ROUTE: login
exports.login(req, res => {
    //get request
    //login page
});

exports.login(req, res => {
    //post request
    //authenticate
    //redirect to dashboard
});

exports.dashboard(req, res => {
    //come here after authentication
});

/////////////////////////////////////ROUTE: clubDetails
exports.getDetailsById(req, res => {
    // get details
});
exports.updateDetailsById(req, res => {
    // update details
});
exports.deleteDetailsById(req, res => {
    // delete details
});


/////////////////////////////////ROUTE: drafts
exports.getDrafts(req, res => {
    // drafts
});
exports.postDrafts(req, res => {
    // post drafts
});
exports.updateDrafts(req, res => {
    // update drafts
});
exports.deleteDrafts(req, res => {
    // delet drafts
});

////////////////////////////////////ROUTE: sentRequests
exports.getSentRequests(req, res => {
    // get sent requests
});
exports.deleteSentRequests(req, res => {
    // delete sent requests
});

/////////////////////////////////////////ROUTE: receivedRequests
exports.getReceivedRequests(req, res => {
    // get received requests
});
exports.deleteReceivedRequests(req, res => {
    // delete received requests
});
exports.updateReceivedRequests(req, res => {
    // update received requests
});
exports.postReceivedRequests(req, res => {
    // post received requests
})

//////////////////////////////////////Route: history
exports.getHistory(req, res => {
    // history 
    // approved requests, rejected requests
})

