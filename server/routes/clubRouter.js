const express = require('express');
const clubController = require('./../controller/clubController')

const router = express.Router();

//router.param('id', testController.checkId);

//buttons on request = send, save as draft, delete, update and save as draft, update and send (last two for received requests)

router
    .route('/login')
    .get(clubController.login)
    .post(clubController.authentication)

router
    .route('/:id/')
    .get(clubController.dashboard)

router
    .route('/:id/clubDetails')
    .get(clubController.getDetailsById)                 // 'Club Details' button on dashboard
    .patch(clubController.updateDetailsById)            // 'Update' button on club details page

router
    .route('/:id/drafts')                               
    .get(clubController.getDrafts)                      // 'Drafts' button on dashboard
    .post(clubController.postDraft)                     // 'Save as Draft' or 'Update and save as draft' button on 'Request'

router
    .route('/:id/sentRequests')             
    .get(clubController.getSentRequests)                // 'Sent Requests' button on dashboard
    .post(clubController.sendRequest)                   // 'Send' or 'Update and send' button on 'Request'

router
    .route('/:id/receivedRequests')
    .get(clubController.getReceivedRequests)            // 'Received' button on dashboard

router
    .route('/:id/req')
    .get(clubController.newRequest)                     // 'New Request' or '+' button on dashboard
    .delete(clubController.deleteRequest);              // 'Delete' button on 'Request'

module.exports = router