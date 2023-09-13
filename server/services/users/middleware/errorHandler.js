function errorHandler(err, req, res, next) {
    console.log(err, "Errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
    const name = err.name

    switch (name) {
        case "value":
            res.status(200).json({ message: "OK" })
        default:
            res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports = errorHandler