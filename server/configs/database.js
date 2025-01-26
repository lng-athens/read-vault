const { MongoClient, ServerApiVersion } = require('mongodb');
const config = require('./config');

let client;

const connectDB = async () => {
    if (!client) {
        try {
            client = await MongoClient.connect(config.mongoUri, {
                serverApi: {
                    version: ServerApiVersion.v1,
                    strict: true,
                    deprecationErrors: true
                }
            });
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('Error connecting to MongoDB: ', error.message);
            process.exit(1);
        }
    }

    return client.db();
};

module.exports = { connectDB };