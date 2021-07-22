const express = require("express");
const clubController = require("./../controller/clubController");
const clubAuth = require("../middleware/clubAuth.js");
const router = express.Router();

//buttons on request = send, save as draft, delete, update and save as draft, update and send (last two for received requests)
//buttons on dashboard = Club Details, New Request, Drafts, Sent Requests, Received for Correction

router
  .route("/login")
  .post(clubController.authentication);

//router.route("/").get(clubAuth, clubController.dashboard); //

router
  .route("/clubDetails")
  .get(clubAuth, clubController.getDetailsById) // 'Club Details' button on dashboard
  .patch(clubAuth, clubController.updateDetailsById); // 'Update' button on club details page

router
  .route("/:id/changePassword")
  .patch(clubAuth, clubController.authorise);

//router.route("/downloadPdf").post(isClubLoggedIn, clubController.downloadPdf);

router
  .route("/:id/drafts")
  .get(clubAuth, clubController.getDrafts) // 'Drafts' button on dashboard
  .post(clubAuth, clubController.postDraft)
  .patch(clubAuth, clubController.updateDraft)
  .delete(clubAuth ,clubController.deleteDraft); // 'Save as Draft' or 'Update and save as draft' button on 'Request'

router
  .route("/:id/sendDraft")
  .post(clubController.sendDraft); // 'Update and send' button on 'Request')

router
  .route("/:id/sentRequests")
  .post(clubAuth, clubController.sendRequest)
  .get(clubAuth, clubController.getSentRequests); // 'Sent Requests' button on dashboard

router
  .route("/receivedRequests")
  .get(clubAuth, clubController.getReceivedRequests); // 'Received for Correction' button on dashboard

router
  .route("/rejectedRequests")
  .get(clubAuth, clubController.getRejectedRequests); // 

router
  .route("/approvedRequests")
  .get(clubAuth, clubController.getApprovedRequests);  


module.exports = router;
