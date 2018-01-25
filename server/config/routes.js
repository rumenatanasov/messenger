const controllers = require('../controllers')

module.exports = (app) => {
    app.get('/', controllers.home.index)
    app.get('/about', controllers.home.about)

    app.get('/users/register', controllers.user.registerGet)
    app.post('/users/register', controllers.user.registerPost)

    app.get('/users/login', controllers.user.loginGet)
    app.post('/users/login', controllers.user.loginPost)

    app.post('/users/logout', controllers.user.logout)

    app.get('/thread/:username', controllers.thread.displayThread)
    app.post('/thread/:username', controllers.thread.addMessage)

    app.post('/like/:username/:id', controllers.thread.likeMessage)
    app.post('/dislike/:username/:id', controllers.thread.dislikeMessage)
    app.post('/block/:username', controllers.user.block)
    app.post('/unblock/:username', controllers.user.unblock)
}