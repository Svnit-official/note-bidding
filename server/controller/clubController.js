const Club = require('./../models/clubModel');
const Request = require('./../models/requestModel');
const Faculty = require('./../models/facultyModel');

// types of status of requests:
//  1. draft (not sent to anyone yet)
//  2. sentByClub (sent by club, received by faculty)
//  3. sentByFaculty (sent back for correction by faculty)
//  4. sentByFinance (sent back for correction by finance)
//  5. correctedDraft (sent back for corrections and saved as draft)
//  5. receivedByFaculty (received after correction by faculty)
//  6. receivedByFinance (received after correction by finance)
//  7. approvedByFaculty (approved by faculty, received by finance)
//  8. rejectedByFaculty
//  9. rejectedByFinance
// 10. approvedByFaculty (approved by finance, received by dean)
// 11. approved (by dean)
// 12. rejectedByDean


//////////////////////////////////////////////////////////////////////////////ROUTE: /login
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


////////////////////////////////////////////////////////////////////////////////ROUTE: /:id
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

/////////////////////////////////////////////////////////////////////////////ROUTE: /:id/clubDetails
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
            data: {
                message: "redirect to /clubDetails",
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

// ///////////////////////////////////////////////////////////////////////////////ROUTE: /:id/drafts
module.exports.getDrafts= async (req, res) => {
    try {
        const drafts = await Request.find({
            $and: [
                { clubId: req.params.id },
                { $or: 
                    [
                        { status: 'draft' },
                        { status: 'correctedDraft' }
                    ] 
                }
            ]
        })
        res.status(200).json({
            status: "success",
            requested: req.requestTime,
            data: {
                drafts
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

module.exports.postDraft= async (req, res) => {
    try {
        const request = req.body;
        if (
            request.status === "sentByFaculty" ||
            request.status === "sentByFinance"
        )   request.status = 'correctedDraft';
        else await Request.create(request); 
        res.status(200).json({
            status: "success",
            requested: req.requestTime,
            data: {
                message: 'redirect to /getDrafts',
                draftedRequest: request
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

module.exports.deleteRequest = async (req, res) => {
    try {
        const request = req.body;
        if (request.status === 'sentByClub') {
            const clubDetails = await Club.findById(req.params.id);
            const sentRequests = clubDetails.sentRequests.pull(request._id);
            await Club.findByIdAndUpdate(req.params.id, { sentRequests })
        }
        await Request.findByIdAndDelete(req.body._id);
        res.status(200).json({
            status: "success",
            requested: req.requestTime,
            data: {
                message: 'redirect to the page from where the request was called (req.body.status)',
                deletedRequest: request
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


//////////////////////////////////////////////////////////////////////////////////ROUTE: /:id/sentRequests
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

module.exports.sendRequest = async (req, res) => {
    try {
        const request = req.body;
        const clubDetails = await Club.findById(req.params.id);
        if (
            request.status === "sentByFaculty" ||
            request.status === "sentByFinance" ||
            request.status === "correctedDraft"
        ) await Request.findByIdAndUpdate(req.params.id, {
            status: "receivedByFaculty",
        });
        else {
            request.status = "sentByClub"
            await Request.create(request);
            const sentRequests = clubDetails.sentRequests;
            sentRequests.push(request);
            await Club.findByIdAndUpdate(req.params.id, {sentRequests})
        }
        
        res.status(200).json({
            status: "success",
            requested: req.requestTime,
            data: {
                message: "flash of message sent, redirect to /sentRequests",
                sentRequest : request
            },
        });
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: "failed",
            messsage: err,
        });
    }
}


// /////////////////////////////////////////////////////////////////////////////ROUTE: /:id/receivedRequests
module.exports.getReceivedRequests= async (req, res) => {
    try {
        const receivedRequests = await Request.find({
            $and: [
                { clubId: req.params.id },
                { $or: 
                    [
                        { status: 'sentByFaculty' },
                        { status: 'sentByFinance' }
                    ]
                }
            ]
        })
        res.status(200).json({
            status: "success",
            requested: req.requestTime,
            data: {
                receivedRequests
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

/////////////////////////////////////////////////////////////////////////////////ROUTE: /:id/req/
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
}

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




