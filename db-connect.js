const mongoose = require('mongoose');

const connectMongo = () => {
    return mongoose.connect(process.env.DB_SERVER);
}

module.exports = mongoose;
module.exports = connectMongo;