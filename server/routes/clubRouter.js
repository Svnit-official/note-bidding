const express = require("express");
const clubController = require("./../controller/clubController");
const { isClubLoggedIn } = require("./../controller/authController");
const auth = require('../middleware/auth.js')
const router = express.Router();

//router.param('id', testController.checkId);

//buttons on request = send, save as draft, delete, update and save as draft, update and send (last two for received requests)
//buttons on dashboard = Club Details, New Request, Drafts, Sent Requests, Received for Correction

router
  .route("/login")
  .get(clubController.login)
  .post(clubController.authentication);

router.route("/").get(isClubLoggedIn, clubController.dashboard); //

router
  .route("/clubDetails")
  .get( clubController.getDetailsById) // 'Club Details' button on dashboard
  .patch( clubController.updateDetailsById); // 'Update' button on club details page

router
  .route("/changePassword")
  .get( clubController.changePassword)
  .patch( clubController.authorise);

router.route("/downloadPdf").post(isClubLoggedIn, clubController.downloadPdf);

router
  .route("/req")
  .get( clubController.newRequest) // 'New Request' or '+' button on dashboard
  .delete( clubController.deleteRequest); // 'Delete' button on 'Request'

router
  .route("/drafts")
  .get( clubController.getDrafts) // 'Drafts' button on dashboard
  .post( clubController.postDraft); // 'Save as Draft' or 'Update and save as draft' button on 'Request'

router
   .route("/sentRequests")
   .get( clubController.getSentRequests) // 'Sent Requests' button on dashboard
   .post( clubController.sendRequest); // 'Send' or 'Update and send' button on 'Request'

router
  .route("/receivedRequests")
  .get( clubController.getReceivedRequests); // 'Received for Correction' button on dashboard

router.route("/logout").get( clubController.logout);

module.exports = router;
