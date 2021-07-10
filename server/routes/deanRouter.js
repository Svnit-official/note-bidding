const express = require("express");
const deanController = require("./../controller/deanController");
const authController = require("./../controller/authController");

const router = express.Router();

//buttons on request = reject, approve, add comments
//buttons on dashboard = Dean details, Pending Requests, Responded Requests

router
  .route("/login")
  .get(deanController.login)
  .post(deanController.authentication);

router
  .route("/:id")
  .get(authController.protect, deanController.dashboard);

router
  .route("/:id/deanDetails")
  .get(authController.protect, deanController.getDetailsById)                         // 'Dean Details' button on dashboard 
  .patch(authController.protect, deanController.updateDetailsById)                    // 'Update' button on dean details page

router
  .route("/:id/pendingRequests")
  .get(authController.protect, deanController.getPendingRequests)                     // 'Pending Requests' button on dashboard
  .post(authController.protect, deanController.approvePendingRequest)                 // 'Approve' button on request (after adding comments)
  .put(authController.protect, deanController.rejectPendingRequest)                   // 'Reject' button on request (after adding comments)

router
  .route("/:id/respondedRequests")
  .get(authController.protect, deanController.getRespondedRequests)                   // 'Responded Requests' button on dashboard 
//  .delete(financeController.deleteSentRequests);

module.exports = router;
