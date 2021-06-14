const express = require("express");
const deanController = require("./../controller/deanController");

const router = express.Router();

//router.param('id', testController.checkId);

router
  .route("/login")
  .get(deanController.login)
  .post(deanController.authentication);

router
    .route("/")
    .get(deanController.dashboard);

router
  .route("/deanDetails")
  .get(deanController.getDetailsById)
  .patch(deanController.updateDetailsById)
  .delete(deanController.deleteDetailstById);

router
  .route("/pendingRequests")
  .get(deanController.getPendingRequests)
  .post(deanController.postPendingRequests)
  .patch(deanController.updatePendingRequests)
  .delete(deanController.deletePendingRequests);

router
    .route("history")
    .get(deanController.getHistory);

module.exports = router;
