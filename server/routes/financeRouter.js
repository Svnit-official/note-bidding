const express = require("express");
const financeController = require("./../controller/financeController");

const router = express.Router();

//router.param('id', testController.checkId);

router
  .route("/login")
  .get(financeController.login)
  .post(financeController.authentication);

router.route("/").get(financeController.dashboard);

router
  .route("/financeDetails")
  .get(financeController.getDetailsById)
  .patch(financeController.updateDetailsById)
  .delete(financeController.deleteDetailstById);

router
  .route("/pendingRequests")
  .get(financeController.getPendingRequests)
  .post(financeController.postPendingRequests)
  .patch(financeController.updatePendingRequests)
  .delete(financeController.deletePendingRequests);

router
  .route("/sentRequests")
  .get(financeController.getSentRequests)
  .delete(financeController.deleteSentRequests);

router.route("history").get(financeController.getHistory);

module.exports = router;
