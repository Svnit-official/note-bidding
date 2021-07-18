const jwt = require("jsonwebtoken");

const auth = async (req,res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        
    
        const isCustomAuth = token.length < 500;

        let decodedData ;
        if(token && isCustomAuth){
            decodedData = jwt.verify(token,'finance');
            req.userId = decodedData?.id;
            console.log("auth done")
        }else{
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
            console.log("auth done")
        }
        
        next() ;
    } catch (error) {
        console.log(error);
    }
}

module.exports = auth