const { getDatabase } = require('../config/mongodb')
const { ObjectId } = require('mongodb')

class User {
    static collection() {
        return getDatabase().collection("Users")
    }

    static findOne(obj) {
        return User.collection().findOne(obj)
    }

    static findByPk(id) {
        return User.collection().findOne({ _id: new ObjectId(id) })
    }

    static findAll(obj) {
        return User.collection().find(obj).toArray()
    }

    static deleteById(id) {
        return User.collection().deleteOne({ _id: new ObjectId(id) })
    }

    static create({ username, email, password, role, phoneNumber, address }) {
        return User.collection().insertOne({ username, email, password, role, phoneNumber, address })
    }
}

module.exports = User