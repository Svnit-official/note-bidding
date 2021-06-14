const express = require('express');
const clubController = require('./../controller/clubController')

const router = express.Router();

//router.param('id', testController.checkId);

router
    .route('/login')
    .get(clubController.login)
    .post(clubController.authentication)

router
    .route('/')
    .get(clubController.dashboard)

router
    .route('/clubDetails')
    .get(clubController.getDetailsById)
    .patch(clubController.updateDetailsById)
    .delete(clubController.deleteDetailstById);

router
    .route('/drafts')
    .get(clubController.getDrafts)
    .post(clubController.postDrafts)
    .patch(clubController.updateDrafts)
    .delete(clubController.deleteDrafts);

router
    .route('/sentRequests')
    .get(clubController.getSentRequests)
    .delete(clubController.deleteSentRequests);

router
    .route('/receivedRequests')
    .get(clubController.getReceivedRequests)
    .patch(clubController.updateReceivedRequests)
    .post(clubController.postReceivedRequests)
    .delete(clubController.deleteReceivedRequests);

router
    .route('history')
    .get(clubController.getHistory)

module.exports = router