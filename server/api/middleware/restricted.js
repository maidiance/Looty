const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../secrets');

function restricted (req, res, next) {
    const token = req.headers.authorization;
    if(!token) {
        res.status(401).json({message: 'token required'});
    } else {
        jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
            if(err) {
                res.status(401).json({message: 'token invalid'});
            } else {
                req.decodedJwt = decodedToken;
                next();
            }
        });
    }
}

const only = role_name => (req, res, next) => {
    console.log(req.decodedJwt);
    if(role_name != req.decodedJwt.role) {
        res.status(403).json({message: 'restricted endpoint'});
    } else {
        next();
    }
}

module.exports = {
    restricted,
    only
};