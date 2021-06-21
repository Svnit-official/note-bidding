const express = require("express");
const facultyController = require("./../controller/facultyController");

const router = express.Router();

//router.param('id', testController.checkId);

//buttons on request = reject, approve, send back, add comments
//buttons on dashboard = Faculty details, Pending Requests, Responded Requests

router
  .route("/login")
  .get(facultyController.login)
  .post(facultyController.authentication);

router
  .route("/:id")
  .get(facultyController.dashboard);

router
  .route("/:id/facultyDetails")                             
  .get(facultyController.getDetailsById)              // 'Faculty Details' button on dashboard 
  .patch(facultyController.updateDetailsById)         // 'Update' button on faculty details page

router
  .route("/:id/pendingRequests")
  .get(facultyController.getPendingRequests)               // 'Pending Requests' button on dashboard
  .post(facultyController.sendBackPendingRequest)         // 'Send back' button on request (after adding comments)
  .post(facultyController.approvePendingRequest)          // 'Approve' button on request (after adding comments)
  .post(facultyController.rejectPendingRequest)           // 'Reject' button on request (after adding comments)

router
  .route("/:id/respondedRequests")
  .get(facultyController.getRespondedRequests)             // 'Responded Requests' button on dashboard 
//  .delete(facultyController.deleteSentRequests);

module.exports = router;
