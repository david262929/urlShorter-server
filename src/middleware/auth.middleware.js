const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next) => {
    if(req.method === "OPTIONS"){
        return next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1]; // "Bearer TOKEN"
        if(!token) {
            return res.status(401).json({message: 'Not authorized'});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        next();
    }catch (e) {
        console.log(e);
        return res.status(401).json({message: 'Not authorized'});
    }
}
















