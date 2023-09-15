const axios = require("axios")
const baseUrl = "http://localhost:4001"
class UserController {
    static async index(req, res, next) {
        try {
            const { data } = await axios({ url: baseUrl + '/users', method: "GET" })
            // console.log(data)
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async show(req, res, next) {
        try {
            const { id } = req.params
            const { data } = await axios({ url: baseUrl + '/users/' + id, method: "GET" })
            // console.log(data)
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async store(req, res, next) {
        try {
            const { username, email, password, phoneNumber, address } = req.body
            console.log({ username, email, password, phoneNumber, address })
            const { data } = await axios({ url: baseUrl + '/users', method: "POST", data: { username, email, password, phoneNumber, address } })

            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async delete(req, res, next) {
        try {
            const { id } = req.params
            const { data } = await axios({ url: baseUrl + '/users/' + id, method: "DELETE" })

            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController