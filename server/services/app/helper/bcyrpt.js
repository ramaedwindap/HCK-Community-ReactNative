const bcrypt = require('bcryptjs');

function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

function verifyPassword(password, dbPass) {
    return bcrypt.compareSync(password, dbPass);
}

module.exports = { hashPassword, verifyPassword }