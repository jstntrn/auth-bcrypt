const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const AuthCtrl = require('./controllers/auth')
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env

const app = express();

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('connected to database')
})

app.use(bodyParser.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.post('/auth/register', AuthCtrl.register)
app.post('/auth/login', AuthCtrl.login)
app.get('/auth/logout', AuthCtrl.logout)
app.get('/auth/currentUser', (req, res) => {
    res.send(req.session.client)
})

app.listen(SERVER_PORT, () => {
    console.log(`listening on port: ${SERVER_PORT}`)
})