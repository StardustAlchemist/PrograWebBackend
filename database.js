const mongoose = require('mongoose');

const URI = 'mongodb://database:27017/personajes';

mongoose.connect(URI)
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;

