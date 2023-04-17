const MongoClient = require('mongodb').MongoClient;

const env = process.env.NODE_ENV || 'development';
const { uri, sdeDBName, userDBName } = require("../config/config")[env]

const options = { useNewUrlParser: true, useUnifiedTopology: true };

const client = new MongoClient(uri, options)

async function connect() {
    // Connect to the database
    try {
        await client.connect();
        console.log('connected to mongodb')
        const sdeDB = client.db(sdeDBName);
        const userDB = client.db(userDBName);
        return { userDB, sdeDB };
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
