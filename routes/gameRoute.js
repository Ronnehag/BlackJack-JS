const express = require('express');
const users = require('../data/users');
const router = express.Router();

router.post('/game', (req, res) => {
    users.findByUsername(req.body.username, req.body.password, (result) => {
        if (result !== null) {
            res.render('game', {
                user: {
                    username: result[0].Username,
                    money: result[0].Money
                }
            });
        } else {
            res.status(500).send('invalid username and/or password');
        }
    });
});

router.put('/game', (req, res) => {
    users.updateUser(req.body.user, req.body.money, (result) => {
        res.json(result[0]);
    });
});

module.exports = router;