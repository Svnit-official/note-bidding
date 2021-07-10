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