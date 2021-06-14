const express = require("express");
const facultyController = require("./../controller/facultyController");

const router = express.Router();

//router.param('id', testController.checkId);

router
  .route("/login")
  .get(facultyController.login)
  .post(facultyController.authentication);

router
    .route("/")
    .get(facultyController.dashboard);

router
  .route("/facultyDetails")
  .get(facultyController.getDetailsById)
  .patch(facultyController.updateDetailsById)
  .delete(facultyController.deleteDetailstById);

router
  .route("/pendingRequests")
  .get(facultyController.getPendingRequests)
  .post(facultyController.postPendingRequests)
  .patch(facultyController.updatePendingRequests)
  .delete(facultyController.deletePendingRequests);

router
  .route("/sentRequests")
  .get(facultyController.getSentRequests)
  .delete(facultyController.deleteSentRequests);

router
    .route("history")
    .get(facultyController.getHistory);

module.exports = router;
