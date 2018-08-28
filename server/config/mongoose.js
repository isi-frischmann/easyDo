module.exports = (dbName) => {
    var mongoose = require('mongoose');

    mongoose.connect('mongodb://localhost/' + dbName)
}