const { verifyToken } = require("../helper/jwt")

async function authentication(req, res, next) {
    try {
        // console.log("Masukk")
        const { access_token } = req.headers
        // console.log(access_token)
        if (!access_token) throw { name: "invalidToken" }

        const verifToken = verifyToken(access_token)

        if (!verifToken) throw { name: "invalidToken" }

        req.user = verifToken
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authentication