function errorHandler(err, req, res, next) {
    console.log(err, "Errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
    const name = err.name

    switch (name) {
        case "usernameRequired":
            return res.status(400).json({ message: "Username is required!" })
        case "emailRequired":
            return res.status(400).json({ message: "Email is required!" })
        case "passwordRequired":
            return res.status(400).json({ message: "Password is required!" })
        case "addressRequired":
            return res.status(400).json({ message: "Address is required!" })
        case "phoneNumberRequired":
            return res.status(400).json({ message: "Phone Number is required!" })
        case "emailExists":
            return res.status(400).json({ message: "Email is already exists!" })
        case "invalidPassLength":
            return res.status(400).json({ message: "Password length min 5!" })
        case "userNotFound":
            return res.status(404).json({ message: "User is not found!" })
        default:
            res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports = errorHandler