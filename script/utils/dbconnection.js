const MongoClient = require('mongodb').MongoClient;
const {roadmapDb, userDb} = require("../global_constants").db;
const env = process.env.NODE_ENV || 'development';
const { uri } = require("../config/config")[env];

const options = { useNewUrlParser: true, useUnifiedTopology: true };
const client = new MongoClient(uri, options);

async function connect() {
    try {
        await client.connect();
        console.log('connected to mongodb')
        const roadmapDbInstance = client.db(roadmapDb);
        const userDbInstance = client.db(userDb);
        return { userDbInstance, roadmapDbInstance };
    }
    catch(error) {
        let msg = `[Error] db connection error: ${error}`
        console.log(msg);
        return {}
    }
}

async function disconnect() {
    try {
        await client.close()
        console.log('disconnected to mongodb')
    }
    catch(error) {
        let msg = `[Error] mongodb disconnection error: ${error}`
        console.log(msg)
    }
}

module.exports = { 
    connect,
    disconnect
};
