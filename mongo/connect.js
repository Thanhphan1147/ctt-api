const { MongoClient } = require("mongodb");
var constants = require('../configs/globals.js')

// Replace the uri string with your MongoDB deployment's connection string.
const uri = constants.MONGO_URI

const client = new MongoClient(uri, { useUnifiedTopology: true });

let _db;

module.exports = {

    connectToMongoAtlas: async function () {
        try {
            await client.connect();
            _db = client.db();
        } catch (err) {
            console.error(err);
        }
    },

    getDb: function() {
        return _db;
    },

    closeDB: async function () {
        await client.close();
    }
};
