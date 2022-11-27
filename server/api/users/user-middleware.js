const Users = require('./user-model');

async function validateUser (req, res, next) {
    const { username, password, dm } = req.body;
    if(!username || !username.trim()) {
        res.status(400).json({message: 'username required'});
    } else if (username.length >= 128) {
        res.status(400).json({message: 'username too long'});
    } else if (!password || !password.trim()) {
        res.status(400).json({message: 'password required'});
    } else {
        next();
    }
}

async function usernameUnique (req, res, next) {
    const { username } = req.body;
    const user = await Users.findBy({username});
        if(user.length >= 1){
            return res.status(400).json({message: 'username must be unique'});
        }
        else {
            next();
        }
}

async function validateUsername (req, res, next) {
    const username = req.body.username;
    const user = await Users.findBy({username});
    if((user == null || user.length < 1) || username.length >= 128) {
        res.status(401).json({message: 'invalid user'});
    } else {
        req.user = user;
        next();
    }
}

function validateUserId (req, res, next) {
    const id = req.params.user_id || req.body.user_id;
    Users.findById(id)
        .then(user => {
            if(user == null) {
                res.status(404).json({message: `user ${id} not found`});
            } else {
                next();
            }
        })
        .catch(() => {
            res.status(500).json({message: 'could not validate user id'});
        })
}

module.exports = {
    validateUser,
    validateUsername,
    validateUserId,
    usernameUnique
}