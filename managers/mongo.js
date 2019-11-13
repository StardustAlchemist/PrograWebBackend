const express = require('express');
const router = express.Router();
var storage = require('../archivos/localstorage.json');
var redis = require('redis');
const Personaje = require('../models/characters');


var personajes;
var arregloPersonajes = [];
var redisClient = redis.createClient({host : 'localhost', port : 6379});

redisClient.on('connect', function() {
    console.log('Conectado a Redis Server');
});







const getCharacter =  async (req, res, next) => {
    console.log('en la base')
    
    personajes =  await Personaje.find();

    console.log('los personajes son: ');
    console.log(personajes);

    for(var i = 0; i < personajes.length; i++){
        
        arregloPersonajes.push({
            "nombre":personajes[i].nombre,
            "franquicia": personajes[i].franquicia,
            "descripcion": personajes[i].descripcion,
            "imagen": personajes[i].imagen
        });
    }

    res.status(200);
    res.json(arregloPersonajes);
}

const postCharacter = async(req, res, next) => {
    const personajes = new Personaje(req.body);
    await personajes.save(personajes);

   // res.status(201).json(character);
   res.status(201);
   console.log(personajes.nombre);
   res.json(personajes.nombre);
}


const putCharacter = async(req, res, next) => {
    const {id} = req.params;
    const personaje = {
        nombre: req.body.nombre,
        franquicia: req.body.franquicia,
        descripcion: req.body.descripcion,
        imagen: req.body.imagen
    };

    console.log(personaje);
    await Personaje.findByIdAndUpdate(id, { $set: personaje }, { new:true} );
    res.status(201);
    res.json({status:"Actualizado"});

}

const deleteCharacter = async(req,res,next) => {
    await Personaje.findByIdAndRemove(req.params.id);
    res.status(204);
}

module.exports = {
    getCharacter,
    postCharacter,
    putCharacter,
    deleteCharacter
}