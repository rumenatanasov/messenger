const mongoose = require('mongoose')
let encryption = require('../utilities/encrypton')
const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let userSchema = mongoose.Schema({
    username: { type: String, required: REQUIRED_VALIDATION_MESSAGE, unique: true },
    firstName: { type: String, required: REQUIRED_VALIDATION_MESSAGE },
    lastName: { type: String, required: REQUIRED_VALIDATION_MESSAGE },
    likedMessages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
    blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    salt: { type: String },
    hashedPass: { type: String },
    roles: [String]
})
userSchema.method({
    authenticate: function (password) {
        return encryption.generateHashedPassword(this.salt, password) === this.hashedPass
    }
})
let User = mongoose.model('User', userSchema)
module.exports = User
module.exports.seedAdminUser = () => {
    User.find({}).then(users => {
        if (users.length > 0) return

        let salt = encryption.generateSalt()
        let hashedPass = encryption.generateHashedPassword(salt, '123456')

        User.create({
            username: 'Admin',
            firstName: 'Admin',
            lastName: 'Admin',
            salt: salt,
            hashedPass: hashedPass,
            roles: ['Admin']

        })
    })
}
