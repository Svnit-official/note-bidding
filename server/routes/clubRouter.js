const express = require("express");
const clubController = require("./../controller/clubController");
const pdfController = require("./../controller/pdfController");
const clubAuth = require("../middleware/clubAuth.js");
const router = express.Router();

//buttons on request = send, save as draft, delete, update and save as draft, update and send (last two for received requests)
//buttons on dashboard = Club Details, New Request, Drafts, Sent Requests, Received for Correction

router.route("/login").post(clubController.authentication);

//router.route("/").get(clubAuth, clubController.dashboard); //

router
  .route("/:id/clubDetails")
  .get(clubAuth, clubController.getDetailsById) // 'Club Details' button on dashboard
  .patch(clubAuth, clubController.updateDetailsById); // 'Update' button on club details page

router.route("/:id/changePassword").patch(clubAuth, clubController.authorise);

router
  .route("/:id/drafts")
  .get(clubAuth, clubController.getDrafts) // 'Drafts' button on dashboard
  .post(clubAuth, clubController.postDraft)
  .patch(clubController.updateDraft)
  .delete(clubController.deleteDraft); // 'Save as Draft' or 'Update and save as draft' button on 'Request'

router.route("/:id/sendDraft").post(clubController.sendDraft); // 'Update and send' button on 'Request')

router
  .route("/:id/sentRequests")
  .post(clubAuth, clubController.sendRequest)
  .get(clubAuth, clubController.getSentRequests); // 'Sent Requests' button on dashboard

router
  .route("/:id/receivedRequests")
  .get(clubAuth, clubController.getReceivedRequests); // 'Received for Correction' button on dashboard

router
  .route("/:id/rejectedRequests")
  .get(clubAuth, clubController.getRejectedRequests); //

router
  .route("/:id/approvedRequests")
  .get(clubAuth, clubController.getApprovedRequests);

router.route("/:id/downloadPdf/club").post(clubAuth, pdfController.downloadPdf);

router
  .route("/:id/comments")
  .get(clubAuth, clubController.getComments)
  .post(clubAuth, clubController.postComments);

router
  .route("/:id/publishEvent")
  .get(clubAuth, clubController.publishedEvents)
  .post(clubAuth, clubController.publishEvent);

module.exports = router;
