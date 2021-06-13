const express = require('express');
const testController = require('./../controller/testsController')

const router = express.Router();

//router.param('id', testController.checkId);

router
    .route('/')
    .get(testController.getAlltests)
    .post(testController.createtest);

router
    .route('/:id')
    .get(testController.gettestById)
    .patch(testController.updatetestById)
    .delete(testController.deletetestById);

module.exports = router