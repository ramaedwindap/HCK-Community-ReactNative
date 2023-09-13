const User = require('../models/User')
class UserController {
    static async store(req, res, next) {
        try {
            const { username, email, password, role, phoneNumber, address } = req.body
            // console.log(username, email, password, role, phoneNumber, address)
            if (!username) throw { name: "usernameRequired" }
            if (!email) throw { name: "emailRequired" }
            if (!password) throw { name: "passwordRequired" }
            if (!phoneNumber) throw { name: "phoneNumberRequired" }
            if (!address) throw { name: "addressRequired" }

            const foundUser = await User.findOne({ email })
            // console.log(foundUser)
            if (foundUser) throw { name: "emailExists" }


            const roleInput = role ?? "admin"

            let user = await User.create({ username, email, password, role: roleInput, phoneNumber, address })
            res.status(200).json(user)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController