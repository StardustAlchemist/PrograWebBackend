var storage = require('../archivos/localstorage.json');
const characterList = storage;
var encontrado;

const getCharacter = (req, res, next) => {
    res.status(200)
    res.json(characterList.personajes);
  }

const getOneCharcter = (req, res, next) => {
  encontrado = false;

  //characterList.personajes[0] = {"id":"1", "nombre":"Link", "franquicia":"Legend of Zelda", "descripcion":"Heroe de Nintendo"}

  console.log(characterList);
    for(var i = 0; i < characterList.personajes.length; i++)
    {
        if(req.params.id === characterList.personajes[i].id)
        {
            characterList.personajes[i] = {"id":req.body.id, "nombre":req.body.nombre, "franquicia":req.body.franquicia, "descripcion":req.body.descripcion}
            encontrado = true;
        }
    }


    
        res.status(204);
        res.json(characterList.personajes);
    
}

addCharacter = (req, res, next) => {
  
}

  module.exports = {
    characterList,
    getCharacter,
    addCharacter,
    getOneCharcter
  }