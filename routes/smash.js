const express = require('express');
const router = express.Router();
var storage = require('../archivos/localstorage.json');
const Personaje = require('../models/characters');
var redis = require('redis');

var redisClient = redis.createClient({host : 'redis', port : 6379});
    redisClient.on('connect', function(err) {
        console.log('Conectado a Redis Server');
});

var elementosEnRedis;



var encontrado;

character = storage;
const personajesRedis = [] 

router.get('/', async (req, res, next) => {

 const personajes = await Personaje.find();
 res.json(personajes); 
 
  /*
  if(elementosEnRedis == 0){
    console.log('Entro al Primero');
    personajesRedis = [];
    const personajes = await Personaje.find();
    //Se empieza a llenar redis
    for(var i = 0; i < personajes.length ; i++){

        id = personajes[i]._id.toString();
      
        redisClient.hmset(id,"_id",id,"nombre",personajes[i].nombre,"franquicia",personajes[i].franquicia.toString(), "descripcion",personajes[i].descripcion.toString(), "imagen",personajes[i].imagen.toString(),function(err,reply) {
            if(err){
                console.log(err);
            }
           
            console.log('Se llena redis');
        }); 
        elementosEnRedis++;    
    }
    //Se termina de llenar redis


    res.status(200).json(personajes);
  }
  else{
    console.log('Entro al segundo');
    redisClient.keys('*', function (err, keys) {
        if (err) {
            return console.log(err)
        };
      
        for(var i = 0, len = keys.length; i < len; i++) {
          //console.log(keys[i]);
          redisClient.hgetall(keys[i],function(err,reply) {
            if(err){
               console.log(err);
            }
            personajesRedis.push(reply);
            console.log(reply);
           });
        }
        elementosEnRedis = keys.length;
      });

      redisClient.expire('*', 30); // Expirty time for 30 seconds.
      res.json(personajesRedis);
  }   */
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

router.delete('/:id', async (req, res, next) => {
    
    
    await Personaje.findByIdAndRemove(req.params.id);
    res.status(204).json(character);

    /*encontrado = false;

    
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
    }*/

});

module.exports = router;