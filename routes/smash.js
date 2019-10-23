const express = require('express');
const router = express.Router();
var storage = require('../archivos/localstorage.json');
const Personaje = require('../models/characters');
var arreglo = [];
var encontrado;

character = storage;


router.get('/', async (req, res, next) => {
    //console.log(character);
    const personajes = await Personaje.find();
    //res.status(200).json(character);
    res.status(200).json(personajes);
});

router.get('/:id', async(req, res, next) => {
    const personajes = await Personaje.findById(req.params.id);
    res.json(personajes);
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

router.put('/:id', (req, res, next) => {

    encontrado = false;

   
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
    }
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