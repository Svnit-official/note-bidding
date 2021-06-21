const Club = require('./../models/clubModel');
const Request = require('./../models/requestModel');
// const Faculty = require('./../models/facultyModel');

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

module.exports.authentication= async (req, res) => {
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
        ) { await Request.findByIdAndUpdate(request._id, {
                status: "receivedByFaculty",
            });
        }
        else {
            await Request.findByIdAndUpdate(request._id, {
                status: "sentByClub",
            })
            const sentRequests = clubDetails.sentRequests;
            sentRequests.push(request);
            await Club.findByIdAndUpdate(req.params.id, { sentRequests })
            
        }
        const sentRequest = Request.findById(req.params.id);
        res.status(200).json({
            status: "success",
            requested: req.requestTime,
            data: {
                message: "flash of message sent, redirect to /sentRequests",
                sentRequest
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




