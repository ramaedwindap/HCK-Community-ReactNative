const { hashPassword } = require('../helper/bcrypt')
const User = require('../models/User')

class UserController {
    static async index(req, res, next) {
        try {
            const users = await User.findAll()

            res.status(200).json(users)
        } catch (error) {
            next(error)
        }
    }

    static async show(req, res, next) {
        try {
            const { id } = req.params
            const user = await User.findByPk(id)

            if (!user) throw { name: "userNotFound" }

            res.status(200).json(user)
        } catch (error) {
            next(error)
        }
    }

    static async store(req, res, next) {
        try {
            const { username, email, password, phoneNumber, address } = req.body
            // console.log(username, email, password, role, phoneNumber, address)
            if (!username) throw { name: "usernameRequired" }
            if (!email) throw { name: "emailRequired" }
            if (!password) throw { name: "passwordRequired" }
            if (!phoneNumber) throw { name: "phoneNumberRequired" }
            if (!address) throw { name: "addressRequired" }
            if (password.length < 5) throw { name: "invalidPassLength" }

            const foundUser = await User.findOne({ email })
            // console.log(foundUser)
            if (foundUser) throw { name: "emailExists" }

            const encryptPass = hashPassword(password)

            const role = "admin"

            let user = await User.create({ username, email, password: encryptPass, role, phoneNumber, address })
            res.status(201).json(user)
        } catch (error) {
            next(error)
        }
    }

    static async delete(req, res, next) {
        try {
            const { id } = req.params
            const foundUser = await User.findByPk(id)
            // console.log(foundUser)
            if (!foundUser) throw { name: "userNotFound" }

            const deleted = await User.deleteById(id)

            // console.log(res)
            res.status(200).json(deleted)
        } catch (error) {
            next(error)
            return
        }
    }
}



module.exports = UserController