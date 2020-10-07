require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const authRoute = require('./routes/auth');
// const usersRoute = require('./routes/users');

const app = express();
app.use(bodyParser.json());
app.use(express.json());

app.use('/auth', authRoute);
// app.use('/users', usersRoute);

app.get('/', (req, res) => {
    res.send('This app works')
})


mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.pd0lo.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('db connected');
}).catch(err => {
    console.error(err)
})

app.listen(process.env.PORT || 3000, () => {
    console.log('server running at 3000')
});