const express = require("express");
const deanController = require("./../controller/deanController");
const deanAuth = require("../middleware/deanAuth");
const router = express.Router();

//buttons on request = reject, approve, add comments
//buttons on dashboard = Dean details, Pending Requests, Responded Requests

router
  .route("/login")
  .post(deanController.authentication);

router
  .route("/:id/details")
  .get(deanController.getDetailsById) // 'Dean Details' button on dashboard
  .patch(deanController.updateDetailsById); // 'Update' button on dean details page

router.route("/:id/changePassword").patch(deanController.authorise);

router
  .route("/:id/pendingRequests")
  .get(deanAuth, deanController.getPendingRequests) // 'Pending Requests' button on dashboard
  .post(deanAuth, deanController.approvePendingRequest) // 'Approve' button on request (after adding comments)
  .put(deanAuth, deanController.rejectPendingRequest); // 'Reject' button on request (after adding comments)

router
  .route("/:id/respondedRequests")
  .get(deanAuth, deanController.getRespondedRequests); // 'Responded Requests' button on dashboard
//  .delete(financeController.deleteSentRequests);

module.exports = router;
