  passwordConfirm: {
    type: String,
    required: [true, "Please provide a password"],
    validate: [
      function (el) {
        return el === this.password;
      },
      "Passwords doesn't match",
    ]
  },


clubSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

clubSchema.methods.correctPassword = async function (candidatePass, userPass) {
  return await bcrypt.compare(candidatePass, userPass);
};


const { promisify } = require('util')
const jwt = require('jsonwebtoken');
//const club = require('./../models/clubModel');
const secret = process.env.SECRET || "this-is-my-secret";

module.exports.protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorisation && req.headers.authorisation.startsWith('Bearer')) {
            token = req.headers.authorisation.split(' ')[1];
        }
        if (!token) {
            console.log('no token');
            return next(
                res.status(401).json({
                    status: 'failed',
                    message: 'Please login first'
                })
            );
        }
        const decoded = await promisify(jwt.verify)(token, secret);
        console.log(decoded.id);
        req.userId = decoded.id;
        // console.log(req.userId);
        // if (req.userId != decoded.id) {
        //     return next(
        //         res.status(401).json({
        //             status: "failed",
        //             message: "Session Expired",
        //         })
        //     );
        // } 
        
    } catch (err) {
        return next(
            res.status(401).json({
                status: 'failed',
                message: 'Please login to access this route'
            })
        );
    }
    next();
}