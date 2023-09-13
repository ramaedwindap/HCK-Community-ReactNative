const { getDatabase } = require('../config/mongodb')
const { ObjectId } = require('mongodb')

class User {
    static collection() {
        return getDatabase().collection("Users")
    }

    static findOne(obj) {
        return User.collection().findOne(obj)
    }

    static create({ username, email, password, role, phoneNumber, address }) {
        return User.collection().insertOne({ username, email, password, role, phoneNumber, address })
    }
}

module.exports = User