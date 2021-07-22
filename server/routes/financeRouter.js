const express = require("express");
const financeController = require("./../controller/financeController");
const finAuth = require("../middleware/financeAuth.js");
const router = express.Router();

//router.param('id', testController.checkId);

//buttons on request = reject, approve, send back, add comments
//buttons on dashboard = Finance details, Pending Requests, Responded Requests

router
  .route("/login")
  .post(financeController.authentication);

router
  .route("/:id/details")
  .get(finAuth, financeController.getDetailsById) // 'Finance Details' button on dashboard
  .patch(finAuth, financeController.updateDetailsById); // 'Update' button on finance details page

router
  .route("/:id/changePassword")
  .patch(finAuth, financeController.authorise);
  
router
  .route("/:id/pendingRequests")
  .get( finAuth, financeController.getPendingRequests) // 'Pending Requests' button on dashboard
  .patch(finAuth, financeController.sendBackPendingRequest) // 'Send back' button on request (after adding comments)
  .post(finAuth, financeController.approvePendingRequest) // 'Approve' button on request (after adding comments)
  .put(finAuth, financeController.rejectPendingRequest); // 'Reject' button on request (after adding comments)

router
  .route("/:id/respondedRequests")
  .get( finAuth, financeController.getRespondedRequests); // 'Responded Requests' button on dashboard

router
  .route("/rejectedRequests")
  .get(finAuth, financeController.getRejectedRequests); //

router
  .route("/approvedRequests")
  .get(finAuth, financeController.getApprovedRequests);  

module.exports = router;
