const express = require('express');
const clubController = require('./../controller/clubController')
const authController = require('./../controller/authController')

const router = express.Router();

//router.param('id', testController.checkId);

//buttons on request = send, save as draft, delete, update and save as draft, update and send (last two for received requests)
//buttons on dashboard = Club Details, New Request, Drafts, Sent Requests, Received for Correction  

router
    .route('/login')
    .get(clubController.login)
    .post(clubController.authentication)

router
    .route('/:id')
    .get(authController.protect, clubController.dashboard)                      // 

router
  .route("/:id/clubDetails")
  .get(authController.protect, clubController.getDetailsById)                  // 'Club Details' button on dashboard
  .patch(authController.protect, clubController.updateDetailsById);            // 'Update' button on club details page

router
  .route("/:id/req")
  .get(authController.protect, clubController.newRequest)                      // 'New Request' or '+' button on dashboard
  .delete(authController.protect, clubController.deleteRequest);               // 'Delete' button on 'Request'

router
  .route("/:id/drafts")
  .get(authController.protect, clubController.getDrafts)                       // 'Drafts' button on dashboard
  .post(authController.protect, clubController.postDraft);                     // 'Save as Draft' or 'Update and save as draft' button on 'Request'

router
  .route("/:id/sentRequests")
  .get(authController.protect, clubController.getSentRequests)                 // 'Sent Requests' button on dashboard
  .post(authController.protect, clubController.sendRequest);                   // 'Send' or 'Update and send' button on 'Request'

router
  .route("/:id/receivedRequests")
  .get(authController.protect, clubController.getReceivedRequests);            // 'Received for Correction' button on dashboard

module.exports = router