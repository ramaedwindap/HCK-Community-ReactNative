function errorHandler(err, req, res, next) {
    console.log(err, "Errrrrrrrrrrrrrrrrrr0000000000000rrrrrrrrrrrrrrrrrr")
    const name = err.name
    let code = err.response.status || 500
    let message = err.response.data.message || "Internal Server Error"


    switch (name) {
        // case "AxiosError:":
        //     return res.status(code).json(data)

        default:
            return res.status(code).json({ message })
    }
}

module.exports = errorHandler