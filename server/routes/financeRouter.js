const express = require("express");
const financeController = require("./../controller/financeController");
const authController = require("./../controller/authController");
const { isFinanceLoggedIn } = require("./../controller/authController");

const router = express.Router();

//router.param('id', testController.checkId);

//buttons on request = reject, approve, send back, add comments
//buttons on dashboard = Finance details, Pending Requests, Responded Requests

router
  .route("/login")
  .get(financeController.login)
  .post(financeController.authentication);

router.route("/:id").get(isFinanceLoggedIn, financeController.dashboard);

router
  .route("/:id/financeDetails")
  .get(isFinanceLoggedIn, financeController.getDetailsById) // 'Finance Details' button on dashboard
  .patch(isFinanceLoggedIn, financeController.updateDetailsById); // 'Update' button on finance details page

router
  .route("/:id/pendingRequests")
  .get(isFinanceLoggedIn, financeController.getPendingRequests) // 'Pending Requests' button on dashboard
  .patch(isFinanceLoggedIn, financeController.sendBackPendingRequest) // 'Send back' button on request (after adding comments)
  .post(isFinanceLoggedIn, financeController.approvePendingRequest) // 'Approve' button on request (after adding comments)
  .put(isFinanceLoggedIn, financeController.rejectPendingRequest); // 'Reject' button on request (after adding comments)

router
  .route("/:id/respondedRequests")
  .get(isFinanceLoggedIn, financeController.getRespondedRequests); // 'Responded Requests' button on dashboard
//  .delete(financeController.deleteSentRequests);

module.exports = router;
