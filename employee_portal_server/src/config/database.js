const mongoose = require('mongoose');

async function connectDB() {
    try {
        const db = await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`);
        console.log('Database Connection Successful!')
        return db;
    } catch (err) {
        console.log('Database Connection Error!')
        console.error(err);
    }
}

module.exports = connectDB;