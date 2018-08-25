const DEVELOPMENT = require('../constants/enviroment').DEVELOPMENT;
const ENV = process.env.ENV;

class Logger {
    static logDevelopment(text) {
        if (DEVELOPMENT === ENV) {
            console.log(text);
        }
    }
    static logRoute(req) {
        Logger.logDevelopment(`${req.session.user} user is on ${req.path} path`);
    }
}

module.exports = Logger;