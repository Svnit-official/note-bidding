const express = require("express");
const facultyController = require("./../controller/facultyController");
const authController = require("./../controller/authController");

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
  .get(authController.protect, facultyController.dashboard);

router
  .route("/:id/facultyDetails")                             
  .get(authController.protect, facultyController.getDetailsById)                  // 'Faculty Details' button on dashboard 
  .patch(authController.protect, facultyController.updateDetailsById)             // 'Update' button on faculty details page

router
  .route("/:id/pendingRequests")
  .get(authController.protect, facultyController.getPendingRequests)              // 'Pending Requests' button on dashboard
  .patch(authController.protect, facultyController.sendBackPendingRequest)        // 'Send back' button on request (after adding comments)
  .post(authController.protect, facultyController.approvePendingRequest)          // 'Approve' button on request (after adding comments)
  .put(authController.protect, facultyController.rejectPendingRequest)            // 'Reject' button on request (after adding comments)

router
  .route("/:id/respondedRequests")
  .get(authController.protect, facultyController.getRespondedRequests)            // 'Responded Requests' button on dashboard 
//  .delete(facultyController.deleteSentRequests);

module.exports = router;
