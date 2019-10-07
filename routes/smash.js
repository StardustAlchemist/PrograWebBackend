const express = require('express');
const router = express.Router();
var arreglo = [];
character = {
    "personajes": [
        {"id":"1", "nombre":"Mario", "franquicia":"Super Mario", "descripcion":"Heroe del nintendo"},
        {"id":"2", "nombre":"Kirby", "franquicia":"Kirby Super Star", "descripcion":"Consentido de Sakurai"},
        {"id":"3", "nombre":"Fox", "franquicia":"Star Fox", "descripcion":"Lider de Star Fox"}
    ]
}


router.get('/', (req, res, next) => {
    console.log(character.personajes.length);
    res.status(200).json(character);
});

router.post('/', (req, res, next) => {

    character.personajes.push( { "id":req.body.id,
                                 "nombre":req.body.nombre,
                                 "franquicia":req.body.franquicia,
                                 "descripcion":req.body.descripcion
});

    res.status(200).json(character);
});

router.put('/', (req, res, next) => {
    res.status(200).json([{
        id: 1,
        name: 'Permiso'
    }]);
});

router.delete('/:id', (req, res, next) => {
    res.status(200).json([{
        id: 1,
        name: 'Permiso'
    }]);
});

module.exports = router;