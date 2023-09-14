const jwt = require('jsonwebtoken');
const SECRET_TOKEN = process.env.SECRET_TOKEN

function signToken(obj) {
    return jwt.sign(obj, SECRET_TOKEN);
}

function verifyToken(token) {
    return jwt.verify(token, SECRET_TOKEN);
}

module.exports = { signToken, verifyToken }