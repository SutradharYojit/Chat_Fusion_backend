const router = require('express').Router();
const userModel = require('../model/users_model');

router.get('/getUsers', (req, res, next) => {
    userModel.findAll({
        attributes: { exclude: ['password'] },
    }).then(users => {
        return res.status(200).json(users);
    })
});


module.exports = router;