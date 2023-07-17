const mongoose = require('mongoose')

async function database() {
    const mongoDB = await mongoose.connect(process.env.DATABASE)
        .then(() => {
            console.log('Connected to the database');
        })
        .catch((error) => {
            console.error('Error connecting to the database:', error);
        });
}

module.exports = database