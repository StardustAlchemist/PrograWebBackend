var storage = require('../archivos/localstorage.json');
const characterList = storage;
var encontrado;

const getCharacter = (req, res, next) => {
    res.status(200)
    res.json(characterList.personajes);
  }

const getOneCharcter = (req, res, next) => {
  encontrado = false;

  characterList.personajes[0] = {"id":"1", "nombre":"Link", "franquicia":"Legend of Zelda", "descripcion":"Heroe de Nintendo"}

    for(var i = 0; i < characterList.personajes.length; i++)
    {
       /* if(req.params.id === characterList.personajes[i].id)
        {
            characterList.personajes[i] = {"id":"1", "nombre":"Link", "franquicia":"Legend of Zelda", "descripcion":"Heroe de Nintendo"}
            encontrado = true;
        }*/
    }


    
        res.status(204);
        res.json(characterList.personajes);
    
}

  module.exports = {
    characterList,
    getCharacter,
    getOneCharcter
  }