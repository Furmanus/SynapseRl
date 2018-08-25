const bcrypt = require('bcrypt');
const config = require('../config/config');

module.exports = {
    encrypt: function (string) {
        return bcrypt.hash(string, config.saltHashRounds);
    },
    compare: function (plainString, hashedString) {
        return bcrypt.compare(plainString, hashedString);
    }
};