const bcrypt = require('bcryptjs');

function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

function verifyPassword(pass, dbPass) {
    return bcrypt.compareSync(pass, dbPass); // true
}

module.exports = { hashPassword, verifyPassword }