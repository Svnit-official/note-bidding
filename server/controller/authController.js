module.exports.isDeanLoggedIn = function (req, res, next) {
  if (!req.session.user_id) {
    return res.send("not authorised");
  }
  next();
};
module.exports.isClubLoggedIn = function (req, res, next) {
  if (!req.session.user_id) {
    return res.send("not authorised");
  }
  next();
};
module.exports.isFacultyLoggedIn = function (req, res, next) {
  if (!req.session.user_id) {
    return res.send("not authorised");
  }
  next();
};
module.exports.isFinanceLoggedIn = function (req, res, next) {
  if (!req.session.user_id) {
    return res.send("not authorised");
  }
  next();
};
