const router = require('express').Router();
const verify = require('./verify-token/verifyToken');
const userModel = require('../models/user');

router.get('/', verify, (req, res) => {
    userModel.find().then(user => {
        res.send(user);
    })
})

router.post('/add-user', verify, (req, res) => {
    const user = new userModel({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age
    })

    try {
        const newUser = user.save();
        res.send({
            message: 'user added successfully',
            data: res.data
        })
    } catch (error) {
        res.status(400).send(error);
    }
})

router.post('/delete-user', verify, async(req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body._id });
        const deletedUser = await userModel.deleteOne(user);
        res.send('deleted')
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;