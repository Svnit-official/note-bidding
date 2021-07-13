const express = require("express");
const deanController = require("./../controller/deanController");
const { isDeanLoggedIn } = require("./../controller/authController");

const router = express.Router();

//buttons on request = reject, approve, add comments
//buttons on dashboard = Dean details, Pending Requests, Responded Requests
router.get("/trial/route", isDeanLoggedIn, function (req, res) {
  res.send("successful");
});
router.get("/logout/route", isDeanLoggedIn, function (req, res) {
  req.session.user_id = null;
  console.log("logged out");
  res.send("logged out");
});
router
  .route("/login")
  .get(deanController.login)
  .post(deanController.authentication);

router.route("/:id").get(isDeanLoggedIn, deanController.dashboard);

router
  .route("/:id/deanDetails")
  .get(isDeanLoggedIn, deanController.getDetailsById) // 'Dean Details' button on dashboard
  .patch(isDeanLoggedIn, deanController.updateDetailsById); // 'Update' button on dean details page

router
  .route("/:id/pendingRequests")
  .get(isDeanLoggedIn, deanController.getPendingRequests) // 'Pending Requests' button on dashboard
  .post(isDeanLoggedIn, deanController.approvePendingRequest) // 'Approve' button on request (after adding comments)
  .put(isDeanLoggedIn, deanController.rejectPendingRequest); // 'Reject' button on request (after adding comments)

router
  .route("/:id/respondedRequests")
  .get(isDeanLoggedIn, deanController.getRespondedRequests); // 'Responded Requests' button on dashboard
//  .delete(financeController.deleteSentRequests);

module.exports = router;
