const mongoose = require('mongoose');
const {logger} = require('../utils/');
const dotenv = require('dotenv');
dotenv.config();

async function connectMongo() {
    try {
        const result = await mongoose.connect(process.env.MONGO_URL);
        logger.info('Mongo Connected..');
    } catch(err) {
        logger.error('Mongo Error::',err);
    }
}

connectMongo()