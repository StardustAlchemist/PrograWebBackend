const mongoose = require('mongoose');
const {Schema} = mongoose;

const CharacterSchema = new Schema({
    nombre: {type: String, required: true},
    franquicia: {type: String, required: true},
    descripcion: {type: String, required:true},
    imagen: {type: String, required: true}
});

module.exports = mongoose.model('Character', CharacterSchema);