class UserController {
    static async store(req, res, next) {
        try {
            const { username, email, password, role, phoneNumber, address } = req.body
            console.log(username, email, password, role, phoneNumber, address)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController