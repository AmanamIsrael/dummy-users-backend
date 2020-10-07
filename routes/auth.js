const router = require('express').Router();
const adminModel = require('../models/admin')
const bcrypt = require('bcrypt');
const { registerValidation, loginValidation } = require('../validation/validation');
const jwt = require('jsonwebtoken');


router.post('/register', async(req, res) => {
    //check for validation errors
    const { error } = registerValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // check if user already exists
    const emailExist = await adminModel.findOne({ email: req.body.email });
    if (emailExist) {
        return res.status(400).send('Email already exists');
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // get req data
    const user = new adminModel({
        email: req.body.email,
        password: hashPassword
    });

    //save admin
    try {
        const newUser = await user.save();
        res.send({
            msg: 'Admin user created',
            UserId: user._id,
        })
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/login', async(req, res) => {
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    //check if admin exists
    const user = await adminModel.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send('Email is incorrect');
    }
    //check if password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send('password is incorrect');
    }
    //assign token
    const token = jwt.sign({ id: user._id, exp: Math.floor(Date.now() / 1000) + (60 * 60 * 1) }, process.env.TOKEN_SECRET);
    res.header('auth-token', token);

    try {
        res.send({
            msg: 'user logged in',
            email: user.email,
            userId: user._id,
            token: token
        })
    } catch (error) {
        res.status(400).send(error);
    }
})


module.exports = router;