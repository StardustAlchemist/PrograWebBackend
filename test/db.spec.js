require('mocha');
const sinon = require('sinon');
const { expect } = require('chai');
const { getCharacter, postCharacter, putCharacter, deleteCharacter} = require('../managers/mongo');
const mongoose = require('mongoose');

describe('User Manager', () => {
    let characters
    beforeEach(() => {
      characters = []
      

    });

    //----------------------------
     it('will get all the personajes', async () => {

       console.log('En el Arreglo');
    
       const URI = 'mongodb://localhost/personajes';

       await mongoose.connect(URI)
           .then(db => console.log('DB is connected'))
           .catch(err => console.error(err));

        const sandbox = sinon.createSandbox()
        const statusMock = sandbox.stub()
        const jsonMock = sandbox.stub()
        const reqMock = sandbox.stub()
        const nextMock = sandbox.stub()
    
        //{"id":"1", "nombre":"Mario", "franquicia":"Super Mario", "descripcion":"Heroe del nintendo"}
        characters.push({
            "nombre": "Fox McCloud",
            "franquicia": "Star Fox",
            "descripcion": "Lider de Star Fox",
            "imagen": "http://smashbros-ultimate.com/images/char/fox.png"
          },
            {
              "nombre":"Samus",
              "franquicia":"Metroid",
              "descripcion":"Cazarecompensas de la galaxia",
              "imagen": "http://smashbros-ultimate.com/images/char/zelda.png",
               }
            );
        
    
        //console.log(characters);
    
        let res = {
          status: statusMock,
          json: jsonMock
        }
    
        
       await getCharacter(reqMock, res, nextMock);
       sinon.assert.calledWith(statusMock, 200)
       sinon.assert.calledWith(jsonMock, characters)
      }).timeout(10000);
    //----------------------------


    it('agregar el personaje', async()=> {

        const URI = 'mongodb://localhost/personajes';

        await mongoose.connect(URI)
            .then(db => console.log('DB is connected'))
            .catch(err => console.error(err));

      const sandbox = sinon.sandbox.create()
      const statusMock = sandbox.stub()
      const jsonMock = sandbox.stub()
      const reqMock = {
        
        body: {
            nombre: "Link",
            franquicia: "Legend of Zelda",
            descripcion: "Heroe de Nintendo",
            imagen: "http://smashbros-ultimate.com/images/char/link.png",
        }
      }
     const nextMock = sandbox.stub()

      //---------------------------
      characters.push({
          "_id": "5dc09972152751130c82b940",
          "nombre": "Link",
          "franquicia": "Legend of Zelda",
          "descripcion": "Heroe de Nintendo",
          "imagen": "http://smashbros-ultimate.com/images/char/link.png",
          "__v":0});
      //---------------------------

      const resMock = {
          status: statusMock,
          json: jsonMock
        }

      await postCharacter(reqMock,resMock,nextMock);
      sinon.assert.calledWith(statusMock, 201)
      sinon.assert.calledWith(jsonMock, characters[0].nombre)

    }).timeout(10000);

    it("Actualizar Personajes", async()=> {
      const URI = 'mongodb://localhost/personajes';

      await mongoose.connect(URI)
            .then(db => console.log('DB is connected'))
            .catch(err => console.error(err));
      
            const sandbox = sinon.sandbox.create();
            const statusMock = sandbox.stub();
            const jsonMock = sandbox.stub();
            const reqMock = {
              params: {
                id: '5dc09972152751130c82b940'
              },
              body: {
                  nombre: "Link",
                  franquicia: "Legend of Zelda",
                  descripcion: "Heroe de Nintendo",
                  imagen: "http://smashbros-ultimate.com/images/char/link.png",
              }
            }
           const nextMock = sandbox.stub()

           var respuestaJson = {status:"Actualizado"};

           const resMock = {
            status: statusMock,
            json: jsonMock
          }
  
        await putCharacter(reqMock,resMock,nextMock);
        sinon.assert.calledWith(statusMock, 201)
        sinon.assert.calledWith(jsonMock, respuestaJson)
    }).timeout(10000);


    it("Eliminar Personaje", async() => {
      const URI = 'mongodb://localhost/personajes';

      await mongoose.connect(URI)
            .then(db => console.log('DB is connected'))
            .catch(err => console.error(err));
      
            const sandbox = sinon.sandbox.create();
            const statusMock = sandbox.stub();
            const jsonMock = sandbox.stub();
            const reqMock = {
              params: {
                id: '5dc09972152751130c82b940'
              }
          }

          const nextMock = sandbox.stub();

          const resMock = {
            status: statusMock
          }

        await deleteCharacter(reqMock,resMock,nextMock);
        sinon.assert.calledWith(statusMock, 204);
    }).timeout(10000);
});

