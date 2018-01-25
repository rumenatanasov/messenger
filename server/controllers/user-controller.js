const encryption = require('../utilities/encrypton')
const User = require('../data/User')
module.exports = {
    registerGet: (req, res) => {
        res.render('users/register')
    },
    registerPost: (req, res) => {
        let reqUser = req.body

        let salt = encryption.generateSalt()
        let hashedPass = encryption.generateHashedPassword(salt, reqUser.password)
        User.create({
            username: reqUser.username,
            firstName: reqUser.firstName,
            lastName: reqUser.lastName,
            salt: salt,
            hashedPass: hashedPass
        }).then(user => {
            req.logIn(user, (err, user) => {
                if (err) {
                    res.locals.globalError = err
                    res.render('users/register', user)

                }
                res.redirect('/')

            })
        })
    },
    loginGet: (req, res) => {
        res.render('users/login')
    },
    loginPost: (req, res) => {
        let reqUser = req.body
        User.findOne({ username: reqUser.username }).then(user => {
            if (!user) {
                res.locals.globalError = 'Invalid user data'
                res.render('users/login')
                return
            }
            if (!user.authenticate(reqUser.password)) {
                res.locals.globalError = 'Invalid user data'
                res.render('users/login')
                return
            }
            req.logIn(user, (err, user) => {
                if (err) {
                    res.locals.globalError = err
                    res.render('users/login')
                }
                res.redirect('/')
            })
        })
    },
    logout: (req, res) => {
        req.logOut()
        req.session.destroy(function (err) {
            res.redirect('/') //Inside a callback… bulletproof!
        })
    
},
block: (req, res) => {
    let username = req.params.username

    User.findOne({username: username}).then(user => {
      User.findByIdAndUpdate(req.user._id, {$addToSet: {blockedUsers: user._id}}).then(currentUser => {
        res.redirect(`/thread/${username}`)
      })
    })
  },
  unblock: (req, res) => {
    let username = req.params.username

    User.findOne({username: username}).then(user => {
      User.findByIdAndUpdate(req.user._id, {$pull: {blockedUsers: {$in: [user._id]}}}).then(currentUser => {
        res.redirect(`/thread/${username}`)
      })
    })
  }
}
