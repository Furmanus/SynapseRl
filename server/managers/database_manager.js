const MongoClient = require('mongodb').MongoClient;
const dbConfig = require('../config/db_config');
const ObjectID = require('mongodb').ObjectID;
const databaseConstants = require('../constants/database_constants');
const url = dbConfig.url;
const uid = require('uid');

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
    static async findUserById(userId) {
        const connection = await DatabaseManager.makeConnection();

        return connection.db().collection(databaseConstants.USER_COLLECTION).findOne({
            _id: ObjectID(userId)
        });
    }
    static async insertNewUser(user, password) {
        const connection = await DatabaseManager.makeConnection();

        return connection.db().collection(databaseConstants.USER_COLLECTION).insertOne({
            user,
            password
        });
    }
    static async createGame(user1Id, user2Id, user1Name, user2Name) {
        const connection = await DatabaseManager.makeConnection();

        user1Name = user1Name || user1Id;
        user2Name = user2Name || user2Id;

        return connection.db().collection(databaseConstants.GAMES_COLLECTION).insertOne({
            firstUser: user1Id,
            secondUser: user2Id,
            firstUserName: user1Name,
            secondUserName: user2Name
        });
    }
    static async getUserGames(userId) {
        const connection = await DatabaseManager.makeConnection();
        const query = {
            $or: [
                {firstUser: userId},
                {secondUser: userId}
            ]
        };

        return connection.db().collection(databaseConstants.GAMES_COLLECTION).find(query).toArray();
    }
}

module.exports = DatabaseManager;