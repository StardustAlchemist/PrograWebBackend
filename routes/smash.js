const express = require('express');
const router = express.Router();
character = {
    "personajes": [
        {"id":"1", "nombre":"Mario", "franquicia":"Super Mario", "descripcion":"Heroe del nintendo"},
        {"id":"2", "nombre":"Kirby", "franquicia":"Kirby Super Star", "descripcion":"Consentido de Sakurai"},
        {"id":"3", "nombre":"Fox", "franquicia":"Star Fox", "descripcion":"Lider de Star Fox"}
    ]
}


router.get('/', (req, res, next) => {
    res.status(200).json(character);
});

router.post('/', (req, res, next) => {
    res.status(200).json([{
        id: 1,
        name: 'Permiso'
    }]);
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