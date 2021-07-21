const express = require("express");
const facultyController = require("./../controller/facultyController");
const { isFacultyLoggedIn } = require("./../controller/authController");
const facAuth = require('../middleware/facultyAuth.js')
const router = express.Router();

//router.param('id', testController.checkId);

//buttons on request = reject, approve, send back, add comments
//buttons on dashboard = Faculty details, Pending Requests, Responded Requests

router
  .route("/login")
  .get(facultyController.login)
  .post(facultyController.authentication);

router.route("/").get(facAuth, facultyController.dashboard);

router
  .route("/:id/details")
  .get(facAuth,facultyController.getDetailsById) // 'Faculty Details' button on dashboard
  .patch(facAuth,facultyController.updateDetailsById); // 'Update' button on faculty details page

router
  .route("/:id/changePassword")
  .get(facAuth, facultyController.changePassword)
  .patch(facAuth, facultyController.authorise);

router
  .route("/:id/pendingRequests")
  .get(facAuth, facultyController.getPendingRequests) // 'Pending Requests' button on dashboard
  .patch(facAuth, facultyController.sendBackPendingRequest) // 'Send back' button on request (after adding comments)
  .post(facAuth, facultyController.approvePendingRequest) // 'Approve' button on request (after adding comments)
  .put(facAuth, facultyController.rejectPendingRequest); // 'Reject' button on request (after adding comments)

router
  .route("/:id/respondedRequests")
  .get(facAuth, facultyController.getRespondedRequests); // 'Responded Requests' button on dashboard
//  .delete(facultyController.deleteSentRequests);

router.route("/logout").get(facAuth, facultyController.logout);

module.exports = router;
