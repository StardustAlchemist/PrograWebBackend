const express = require('express');
const router = express.Router();
var storage = require('../archivos/localstorage.json');
var arreglo = [];
var encontrado;
/*character = {
    "personajes": [
        {"id":"1", "nombre":"Mario", "franquicia":"Super Mario", "descripcion":"Heroe del nintendo"},
        {"id":"2", "nombre":"Kirby", "franquicia":"Kirby Super Star", "descripcion":"Consentido de Sakurai"},
        {"id":"3", "nombre":"Fox", "franquicia":"Star Fox", "descripcion":"Lider de Star Fox"}
    ]
}*/
character = storage;


router.get('/', (req, res, next) => {
    console.log(character);
    res.status(200).json(character);
});

router.post('/', (req, res, next) => {

    character.personajes.push( { "id":req.body.id,
                                 "nombre":req.body.nombre,
                                 "franquicia":req.body.franquicia,
                                 "descripcion":req.body.descripcion
});

    res.status(201).json(character);
});

router.put('/:id', (req, res, next) => {

    encontrado = false;

    for(var i = 0; i < character.personajes.length; i++)
    {
        if(req.params.id === character.personajes[i].id)
        {
            character.personajes[i] = {"id":req.body.id, "nombre":req.body.nombre, "franquicia":req.body.franquicia, "descripcion":req.body.descripcion}
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