function errorHandler(err, req, res, next) {
    console.log(err, "<==================error")
    let name = err.name
    // console.log(err.name, "----------------------------")
    switch (name) {
        case "SequelizeUniqueConstraintError":
        case "SequelizeValidationError":
            let message = err.errors[0].message
            // console.log(message)
            return res.status(400).json({ message })
        case "emailRequired":
            return res.status(400).json({ message: "Email is required!" })
        case "passwordRequired":
            return res.status(400).json({ message: "Password is required!" })
        case "invalidInputLogin":
            return res.status(401).json({ message: "Invalid email or password" })
        case "invalidToken":
        case "JsonWebTokenError":
            return res.status(401).json({ message: "Invalid token" })
        case "notFound":
            return res.status(404).json({ message: "Not Found" })
        case "tagRequired":
            return res.status(400).json({ message: "Tags is required!" })
        case "tagMinimun":
            return res.status(400).json({ message: "Tags min 3!" })
        case "minPassword":
            return res.status(400).json({ message: "Password length minimun 5 character!" })


        default:
            return res.status(500).json({ message: "Internal server error" })
    }
}

module.exports = errorHandler