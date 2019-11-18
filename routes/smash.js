const express = require('express');
const router = express.Router();
var storage = require('../archivos/localstorage.json');
const Personaje = require('../models/characters');
var redis = require('redis');

var redisClient = redis.createClient({host : 'localhost', port : 6379});
    redisClient.on('connect', function(err) {
        console.log('Conectado a Redis Server');
});




character = storage;
 


router.get('/', async (req, res, next) => {

redisClient.exists('redis_id', async (err, respuesta) =>{
    if(respuesta==1){
        console.log('Existe');
        redisClient.get('redis_id', function(err, reply) {
            res.json(JSON.parse(reply));
        });
    }
    else{
        console.log('No Existe');
        const personajes = await Personaje.find();
        redisClient.setex('redis_id', 30, JSON.stringify(personajes));
        res.json(personajes);
    }
});

 

 

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
});

router.post('/', async (req, res, next) => {

    redisClient.exists("redis_id", (err,reply)=>{
        if(reply == 1){
            redisClient.del("redis_id");
        }
    });
   

    const personajes = new Personaje(req.body);
    console.log(req.body);
    await personajes.save(personajes);

   // res.status(201).json(character);
   res.status(201).json(personajes);
});

router.put('/:id', async (req, res, next) => {

    redisClient.exists("redis_id", (err,reply)=>{
        if(reply == 1){
            redisClient.del("redis_id");
        }
    });

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

   
});

router.delete('/:id', async (req, res, next) => {
    
    redisClient.exists("redis_id", (err,reply)=>{
        if(reply == 1){
            redisClient.del("redis_id");
        }
    });    

    await Personaje.findByIdAndRemove(req.params.id);
    res.status(204).json(character);
});

module.exports = router;