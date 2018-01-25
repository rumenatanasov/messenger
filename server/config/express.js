const handlebars = require('express-handlebars')
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const helpers = require('./helpers')
module.exports = (app) => {
    app.engine('handlebars', handlebars({
        defaultLayout: 'main',
        helpers: helpers
    }))
    app.set('view engine', 'handlebars')
    app.use(cookieParser())
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(session({secret: 'laino!@#$%', resave: false, saveUninitialized: false}))
    app.use(passport.initialize())
    app.use(passport.session())

    app.use((req, res, next) => {
        if(req.user) {
            res.locals.currentUser = req.user
        }
        next()
    })
    app.use(express.static('public'))

    console.log('Express is ready')
}