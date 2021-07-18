const express = require("express");
const facultyController = require("./../controller/facultyController");
const { isFacultyLoggedIn } = require("./../controller/authController");

const router = express.Router();

//router.param('id', testController.checkId);

//buttons on request = reject, approve, send back, add comments
//buttons on dashboard = Faculty details, Pending Requests, Responded Requests

router
  .route("/login")
  .get(facultyController.login)
  .post(facultyController.authentication);

router.route("/").get(isFacultyLoggedIn, facultyController.dashboard);

router
  .route("/:id/details")
  .get(facultyController.getDetailsById) // 'Faculty Details' button on dashboard
  .patch(facultyController.updateDetailsById); // 'Update' button on faculty details page

router
  .route("/changePassword")
  .get(isFacultyLoggedIn, facultyController.changePassword)
  .patch(isFacultyLoggedIn, facultyController.authorise);

router
  .route("/pendingRequests")
  .get(isFacultyLoggedIn, facultyController.getPendingRequests) // 'Pending Requests' button on dashboard
  .patch(isFacultyLoggedIn, facultyController.sendBackPendingRequest) // 'Send back' button on request (after adding comments)
  .post(isFacultyLoggedIn, facultyController.approvePendingRequest) // 'Approve' button on request (after adding comments)
  .put(isFacultyLoggedIn, facultyController.rejectPendingRequest); // 'Reject' button on request (after adding comments)

router
  .route("/respondedRequests")
  .get(isFacultyLoggedIn, facultyController.getRespondedRequests); // 'Responded Requests' button on dashboard
//  .delete(facultyController.deleteSentRequests);

router.route("/logout").get(isFacultyLoggedIn, facultyController.logout);

module.exports = router;
