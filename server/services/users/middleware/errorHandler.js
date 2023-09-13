function errorHandler(err, req, res, next) {
    console.log(err, "Errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
    const name = err.name

    switch (name) {
        case "usernameRequired":
            res.status(400).json({ message: "Username is required!" })
        case "emailRequired":
            res.status(400).json({ message: "Email is required!" })
        case "passwordRequired":
            res.status(400).json({ message: "Password is required!" })
        case "addressRequired":
            res.status(400).json({ message: "Address is required!" })
        case "phoneNumberRequired":
            res.status(400).json({ message: "Phone Number is required!" })
        case "emailExists":
            res.status(400).json({ message: "Email is already exists!" })
        default:
            res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports = errorHandler