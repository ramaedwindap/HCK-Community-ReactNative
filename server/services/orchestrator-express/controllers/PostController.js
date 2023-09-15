const axios = require("axios")
const baseUrl = "http://localhost:4002"

class PostController {
    static async index(req, res, next) {
        try {
            const { data } = await axios({ url: baseUrl + "/posts", method: "GET" })
            // console.log(data)
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async show(req, res, next) {
        try {
            const { slug } = req.params
            const { data } = await axios({ url: baseUrl + '/posts/' + slug, method: "GET" })
            // console.log(data)
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = PostController