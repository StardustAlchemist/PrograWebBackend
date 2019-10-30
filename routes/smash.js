const express = require('express');
const router = express.Router();
var storage = require('../archivos/localstorage.json');
const Personaje = require('../models/characters');

var redis = require('redis');


var redisClient = redis.createClient({host : 'localhost', port : 6379});

redisClient.on('connect', function() {
    console.log('Conectado a Redis Server');
});


var encontrado;

character = storage;


router.get('/', async (req, res, next) => {


    const personajes = await Personaje.find();
    res.status(200).json(personajes);
});

router.get('/:id', async(req, res, next) => {
    redisClient.exists(req.params.id.toString(), async function(err,reply) {
        if(!err) {
         if(reply === 1) {
          console.log("Key exists");
          console.log("-------")
          redisClient.hgetall(req.params.id.toString(),function(err,reply) {
            console.log(err);
            console.log(reply);
            res.json(reply);
           });
         } else {
          console.log("Does't exists");
          const personajes = await Personaje.findById(req.params.id);
          
          redisClient.hmset(req.params.id.toString(),"_id",req.params.id.toString(),"nombre",personajes.nombre,"franquicia",personajes.franquicia.toString(), "descripcion",personajes.descripcion.toString(), "imagen",personajes.imagen.toString(),function(err,reply) {
            console.log(err);
            console.log(reply);
           });
    
           redisClient.expire(personajes._id, 30); // Expirty time for 30 seconds.
           res.json(personajes);
         }
        }
       });

   

    /*const personajes = await Personaje.findById(req.params.id);
    //console.log(personajes._id);
    res.json(personajes);*/
});

router.post('/', async (req, res, next) => {

    /*character.personajes.push( { "id":req.body.id,
                                 "nombre":req.body.nombre,
                                 "franquicia":req.body.franquicia,
                                 "descripcion":req.body.descripcion
});*/

    const personajes = new Personaje(req.body);
    console.log(req.body);
    await personajes.save(personajes);

   // res.status(201).json(character);
   res.status(201).json(personajes);
});

router.put('/:id', async (req, res, next) => {

    const {id} = req.params;
    const personaje = {
        nombre: req.body.nombre,
        franquicia: req.body.franquicia,
        descripcion: req.body.descripcion,
        imagen: req.body.imagen
    };

    console.log(personaje);
    await Personaje.findByIdAndUpdate(id, { $set: personaje }, { new:true} );
    res.status(201).json({status:"Actualizado"});

    /*encontrado = false;

   
    for(var i = 0; i < character.personajes.length; i++)
    {
        if(req.params.id === character.personajes[i].id)
        {
            character.personajes[i] = {"id":req.body.id, "nombre":req.body.nombre, "franquicia":req.body.franquicia, "descripcion":req.body.descripcion}
            encontrado = true;
        }
    }


    if(encontrado == true)
    {
        console.log(character);
        res.status(204).json(character);
    }
    else
    {
        res.status(404).json({"message": "no encontrado"});
    }*/
});

router.delete('/:id', (req, res, next) => {
    
    encontrado = false;

    
    for(var i = 0; i < character.personajes.length; i++)
    {
        if(req.params.id === character.personajes[i].id)
        {
            character.personajes.splice(i,1);
            encontrado = true;
        }
    }

    if(encontrado == true)
    {

        res.status(204).json(character);
    }
    else
    {
        res.status(404).json({"message": "no encontrado"});
    }

});

module.exports = router;