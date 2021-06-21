const express = require("express");
const deanController = require("./../controller/deanController");

const router = express.Router();

//buttons on request = reject, approve, add comments
//buttons on dashboard = Dean details, Pending Requests, Responded Requests

router
  .route("/login")
  .get(deanController.login)
  .post(deanController.authentication);

router
    .route("/:id")
    .get(deanController.dashboard);

router
  .route("/deanDetails")
  .get(deanController.getDetailsById)                         // 'Dean Details' button on dashboard 
  .patch(deanController.updateDetailsById)                    // 'Update' button on dean details page

router
  .route("/:id/pendingRequests")
  .get(deanController.getPendingRequests)              // 'Pending Requests' button on dashboard
  .post(deanController.approvePendingRequest)          // 'Approve' button on request (after adding comments)
  .post(deanController.rejectPendingRequest)           // 'Reject' button on request (after adding comments)

router
  .route("/:id/respondedRequests")
  .get(deanController.getRespondedRequests)            // 'Responded Requests' button on dashboard 
//  .delete(financeController.deleteSentRequests);

module.exports = router;
