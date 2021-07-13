const express = require("express");
const clubController = require("./../controller/clubController");
const { isClubLoggedIn } = require("./../controller/authController");

const router = express.Router();

//router.param('id', testController.checkId);

//buttons on request = send, save as draft, delete, update and save as draft, update and send (last two for received requests)
//buttons on dashboard = Club Details, New Request, Drafts, Sent Requests, Received for Correction

router
  .route("/login")
  .get(clubController.login)
  .post(clubController.authentication);

router.route("/")
  .get(isClubLoggedIn, clubController.dashboard); //

router
  .route("/clubDetails")
  .get(isClubLoggedIn, clubController.getDetailsById) // 'Club Details' button on dashboard
  .patch(isClubLoggedIn, clubController.updateDetailsById); // 'Update' button on club details page

router
  .route("/changePassword")
  .get(isClubLoggedIn, clubController.changePassword)
  .patch(isClubLoggedIn, clubController.authorise);

router
  .route("/req")
  .get(isClubLoggedIn, clubController.newRequest) // 'New Request' or '+' button on dashboard
  .delete(isClubLoggedIn, clubController.deleteRequest); // 'Delete' button on 'Request'

router
  .route("/drafts")
  .get(isClubLoggedIn, clubController.getDrafts) // 'Drafts' button on dashboard
  .post(isClubLoggedIn, clubController.postDraft); // 'Save as Draft' or 'Update and save as draft' button on 'Request'

router
  .route("/sentRequests")
  .get(isClubLoggedIn, clubController.getSentRequests) // 'Sent Requests' button on dashboard
  .post(isClubLoggedIn, clubController.sendRequest); // 'Send' or 'Update and send' button on 'Request'

router
  .route("/receivedRequests")
  .get(isClubLoggedIn, clubController.getReceivedRequests); // 'Received for Correction' button on dashboard

router
  .route("/logout")
  .get(isClubLoggedIn, clubController.logout);

module.exports = router;
