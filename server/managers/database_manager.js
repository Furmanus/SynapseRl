const MongoClient = require('mongodb').MongoClient;
const dbConfig = require('../config/db_config');
const databaseConstants = require('../constants/database_constants');
const url = dbConfig.url;

class DatabaseManager {
    static makeConnection() {
        return MongoClient.connect(url, {
            useNewUrlParser: true
        });
    }
    static async findUser(user) {
        const connection = await DatabaseManager.makeConnection();

        return connection.db().collection(databaseConstants.USER_COLLECTION).findOne({
            user
        });
    }
    static async insertNewUser(user, password) {
        const connection = await DatabaseManager.makeConnection();

        return connection.db().collection(databaseConstants.USER_COLLECTION).insertOne({
            user,
            password
        });
    }
}

module.exports = DatabaseManager;