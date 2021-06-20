const Club = require('./../models/clubModel');
const Request = require('./../models/requestModel');

// five status of requests:
//  1. draft (not sent to anyone yet)
//  2. sent (by club), received (by faculty)
//  3. sent (by faculty), received (by finance)
//  4. sent (by finance), received (by dean)
//  5. approved, rejected by dean


///////////////////////////ROUTE: login
module.exports.login = async (req, res) => {
    try {
        res.status(200).json({
            status: "success",
            requested: req.requestTime,
            message: "Club Login Page"
        });
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: "failed",
            messsage: err,
        });
    }
};

module.exports.authenticate= async (req, res) => {
    try {
        res.status(200).json({
            status: "success",
            requested: req.requestTime,
            message : "post request for authentication"
        });
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: "failed",
            messsage: err,
        });
    }
};


/////////////////////////////////////ROUTE: /:id/
module.exports.dashboard= async (req, res) => {
    try {
        res.status(200).json({
            status: "success",
            requested: req.requestTime,
            message : `dashboard for club id :${req.params.id}`
        });
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: "failed",
            messsage: err,
        });
    }
};

/////////////////////////////////////ROUTE: /:id/clubDetails
module.exports.getDetailsById = async (req, res) => {
    try {
        const clubDetails = await Club.findById(req.params.id);
        res.status(200).json({
            status: "success",
            requested: req.requestTime,
            data: {
                clubDetails
            }
        });
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: "failed",
            messsage: err,
        });
    }  
};

module.exports.updateDetailsById= async (req, res) => {
    try {
        const clubDetailsOld = await Club.findById(req.params.id);
        const clubDetailsNew = await Club.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: "success",
            requested: req.requestTime,
            data:{
                clubDetailsOld,
                clubDetailsNew
            }
        });
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: "failed",
            messsage: err,
        });
    }
};

module.exports.deleteDetailsById= async (req, res) => {
    try {
        const clubDetailsDeleted = await Club.findById(req.params.id);
        await Club.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: "success",
            requested: req.requestTime,
            data: {
                clubDetailsDeleted
            }
        });
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: "failed",
            messsage: err,
        });
    }
};


// /////////////////////////////////ROUTE: /:id/drafts
module.exports.getDrafts= async (req, res) => {
    try {
        const clubDetails = await Club.findById(req.params.id);
        const requestIds = clubDetails.drafts;
        const requests = await Request.find({_id : [...requestIds]})
        res.status(200).json({
            status: "success",
            requested: req.requestTime,
            data: {
                requests
            }
        });
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: "failed",
            messsage: err,
        });
    }
};

/// redirect to /:id/:reqid to create, update, delete requests in drafts.

// ////////////////////////////////////ROUTE: sentRequests
module.exports.getSentRequests= async (req, res) => {
    try {
        const clubDetails = await Club.findById(req.params.id);
        const requestIds = clubDetails.sentRequests;
        const requests = await Request.find({_id : [...requestIds]})
        res.status(200).json({
            status: "success",
            requested: req.requestTime,
            data: {
                requests
            }
        });
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: "failed",
            messsage: err,
        });
    }
};

// module.exports.deleteSentRequests= async (req, res) => {
    
//};
/// redirect to /:id/:reqid to delete sent requests.

// /////////////////////////////////////////ROUTE: receivedRequests
module.exports.getReceivedRequests= async (req, res) => {
    try {
        const clubDetails = await Club.findById(req.params.id);
        const requestIds = clubDetails.receivedRequests;
        const requests = await Request.find({_id : [...requestIds]})
        res.status(200).json({
            status: "success",
            requested: req.requestTime,
            data: {
                requests
            }
        });
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: "failed",
            messsage: err,
        });
    }
};

// module.exports.deleteReceivedRequests= async (req, res) => {
//     // delete received requests
// };
// module.exports.updateReceivedRequests= async (req, res) => {
//     // update received requests
// };
// module.exports.postReceivedRequests = async (req, res) => {
//     // post received requests
// };

/// redirect to /:id/:reqid to delete, update, post received requests.


//////////////////////////////////ROUTE: /:id/:reqid
module.exports.postRequest= async (req, res) => {
    try {
        const request = await Request.create(req.body)
        const clubDetails = await Club.findById(req.params.id);
        clubDetails[`${request.status}`].push(request._id);
        await Club.findByIdAndUpdate(req.params.id, clubDetails, {
            new: true,
            runValidators: true,
        });
        const requestsNew = await Request.find({ _id: [...clubDetails[`${request.status}`]] });
        res.status(200).json({
            status: "success",
            requested: req.requestTime,
            data: {
                [`${request.status}`]: requestsNew
            }
        });
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: "failed",
            messsage: err,
        });
    }
};

module.exports.updateRequest= async (req, res) => {
    try {
        const requestOld = await Request.findById(req.params.reqid);
        const requestNew = await Request.findByIdAndUpdate(req.body.reqid, req.body, {
          new: true,
          runValidators: true,
        });
        res.status(200).json({
            status: "success",
            requested: req.requestTime,
            data: {
                requestOld,
                requestNew
            }
        });
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: "failed",
            messsage: err,
        });
    }
};

module.exports.deleteRequest= async (req, res) => {
    try {
        const request = await Request.findByIdAndDelete(req.params.reqid);
        const clubDetails = await Club.findById(req.params.id);
        clubDetails[`${request.status}`].pull(req.params.reqid);
        await Club.findByIdAndUpdate(req.params.id, clubDetails, {
            new: true,
            runValidators: true,
        });
        const requestsNew = await Request.find({_id: [...clubDetails[`${request.status}`]]});
        res.status(200).json({
            status: "success",
            requested: req.requestTime,
            data: {
                [`${request.status}`]: requestsNew
            }
        });
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: "failed",
            messsage: err,
        });
    }
};


// //////////////////////////////////////Route: history
module.exports.getHistory = async (req, res) => {
    try {
        const clubDetails = await Club.findById(req.params.id);
        const requestIdsApp = clubDetails.history.approved;
        const requestIdsRej = clubDetails.history.rejected;
        const requestsApp = await Request.find({ _id: [...requestIdsApp] })
        const requestsRej = await Request.find({ _id: [...requestIdsRej] });
        res.status(200).json({
            status: "success",
            requested: req.requestTime,
            data: {
                requestsApp,
                requestsRej
            }
        });
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: "failed",
            messsage: err,
        });
    }
};

