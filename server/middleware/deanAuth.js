const jwt = require("jsonwebtoken");
const secret = process.env.DEAN_SECRET || 'dean';

const deanAuth = async (req,res,next) => {
    try {
        if (!req.headers.authorization) {
          return next(
            res.status(401).json({
              status: "unauthorised",
              message: "Please Login First",
            })
          );
        }
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;
        let decodedData ;
        if(token && isCustomAuth){
            decodedData = jwt.verify(token, secret);
            req.userId = decodedData?.id;
        }else{
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }
        if (req.userId == req.params.id) {
          console.log("auth done");
          return next();
        } else {
          console.log("unauthorised");
          return next(
            res.status(401).json({
              status: "unauthorised",
              message: "session expired",
            })
          );
        }
    } catch (err) {
        console.log(err);
        console.log(err);
        res.status(404).json({
          status: "failed",
          message: err,
        });
    }
}

module.exports = deanAuth