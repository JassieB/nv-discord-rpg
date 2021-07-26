const mongoose = require('mongoose');
const { mongo_url } = require('./config.json');

module.exports = async () => {
    await mongoose.connect(mongo_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    console.log('MongoDB Connected.')
    return mongoose;
}