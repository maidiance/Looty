const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Users = require('./user-model');
const { validateUser, validateUsername, usernameUnique, validateUserId } = require('./user-middleware');
const { restricted, only} = require('../middleware/restricted');
const { JWT_SECRET } = require('../secrets');

router.post('/register', validateUser, usernameUnique, async (req, res) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;
    let result = await Users.insert(user);
    res.status(201).json(result);
});

router.post('/login', validateUser, validateUsername, (req, res) => {
    const request = req.body.password;
    const [user] = req.user;
    if(bcrypt.compareSync(request, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
            message: `welcome ${user.username}`,
            data: token
        });
    } else {
        res.json(401).json({message: 'invalid credentials'});
    }
});

router.put('/:id', restricted, only('admin'), validateUserId, usernameUnique, async (req, res) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;
    let result = await Users.update(req.params.id, user);
    res.status(200).json(result);
});

router.delete('/:id', restricted, only('admin'), validateUserId, (req, res) => {
    const { id } = req.params;
    Users.remove(id)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(() => {
            res.status(500).json({message: 'could not delete user'});
        })
});

function generateToken(user) {
    const payload = {
        subject: user.user_id,
        username: user.username,
        role: user.role
    };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
}

module.exports = router;