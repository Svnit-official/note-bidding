const express = require("express");
const financeController = require("./../controller/financeController");
const { isFinanceLoggedIn } = require("./../controller/authController");
const finAuth = require("../middleware/financeAuth.js");
const bcrypt = require("bcrypt");
const financeHead = require("../models/financeHead");
const router = express.Router();

//router.param('id', testController.checkId);

//buttons on request = reject, approve, send back, add comments
//buttons on dashboard = Finance details, Pending Requests, Responded Requests
router.post("/register", async (req, res) => {
  const {
    username,
    password,
    financeName,
    financeEmail,
    financeContact,
    financePic,
    signature,
  } = req.body;
  const p = await bcrypt.hash(password, 10);
  const user = new financeHead({
    username,
    password: p,
    financeName,
    financeEmail,
    financeContact,
    financePic,
    signature,
  });
  await user.save();
  res.json({ status: "success" });
});
router
  .route("/login")
  .get(financeController.login)
  .post(financeController.authentication);

router.route("/").get(finAuth, financeController.dashboard);

router
  .route("/:id/details")
  .get(financeController.getDetailsById) // 'Finance Details' button on dashboard
  .patch(financeController.updateDetailsById); // 'Update' button on finance details page

router
  .route("/changePassword")
  .get(finAuth, financeController.changePassword)
  .patch(finAuth, financeController.authorise);

router
  .route("/pendingRequests")
  .get(finAuth, financeController.getPendingRequests) // 'Pending Requests' button on dashboard
  .patch(finAuth, financeController.sendBackPendingRequest) // 'Send back' button on request (after adding comments)
  .post(finAuth, financeController.approvePendingRequest) // 'Approve' button on request (after adding comments)
  .put(finAuth, financeController.rejectPendingRequest); // 'Reject' button on request (after adding comments)

router
  .route("/respondedRequests")
  .get(finAuth, financeController.getRespondedRequests); // 'Responded Requests' button on dashboard
//  .delete(financeController.deleteSentRequests);

router.route("/logout").get(finAuth, financeController.logout);

module.exports = router;
