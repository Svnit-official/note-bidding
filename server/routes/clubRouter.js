const express = require('express');
const clubController = require('./../controller/clubController')

const router = express.Router();

//router.param('id', testController.checkId);

router
    .route('/login')
    .get(clubController.login)
    .post(clubController.authentication)

router
    .route('/:id/')
    .get(clubController.dashboard)

router
    .route('/:id/clubDetails')
    .get(clubController.getDetailsById)
    .patch(clubController.updateDetailsById)
    .delete(clubController.deleteDetailsById);

router
    .route('/:id/drafts')
    .get(clubController.getDrafts)

router
    .route('/:id/:reqid')
    .post(clubController.postRequest)
    .patch(clubController.updateRequest)
    .delete(clubController.deleteRequest);

router
    .route('/:id/sentRequests')
    .get(clubController.getSentRequests)
    .delete(clubController.deleteSentRequests);

router
    .route('/:id/receivedRequests')
    .get(clubController.getReceivedRequests)
    // .patch(clubController.updateReceivedRequests)
    // .post(clubController.postReceivedRequests)
    // .delete(clubController.deleteReceivedRequests);

router
    .route('/:id/history')
    .get(clubController.getHistory)

module.exports = router