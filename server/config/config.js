const path = require('path')
let rootPath = path.normalize(path.normalize(__dirname, '/../../'))

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost:27017/rumen-messenger',
        port: 3000
    },
    production: {
        port: process.env.PORT
    }
}