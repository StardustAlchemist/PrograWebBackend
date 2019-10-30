require('mocha')
const sinon = require('sinon')
const { expect } = require('chai')
const { characterList, getCharacter, getOneCharcter } = require('../managers/smash')

describe('User Manager', () => {
  let characters
  beforeEach(() => {
    characters = []
    //characterList.splice(0, characterList.length)
  })

  it('will get all the characters', () => {
    const sandbox = sinon.sandbox.create()
    const statusMock = sandbox.stub()
    const jsonMock = sandbox.stub()
    const reqMock = sandbox.stub()
    const nextMock = sandbox.stub()

    //{"id":"1", "nombre":"Mario", "franquicia":"Super Mario", "descripcion":"Heroe del nintendo"}
    characters.push({
        "id": "1",
        "nombre": "Mario",
        "franquicia": "Super Mario",
        "descripcion": "Heroe de Nintendo"
        
    });
    

   

    const res = {
      status: statusMock,
      json: jsonMock
    }

    getCharacter(reqMock, res, nextMock)
    sinon.assert.calledWith(statusMock, 200)
    sinon.assert.calledWith(jsonMock, characters)
  });


  //Obtener un personaje....................
  it('will get one user sucessfully', () => {
    const sandbox = sinon.sandbox.create()
    const statusMock = sandbox.stub()
    const jsonMock = sandbox.stub()
    const reqMock = {
      params: {
        id: '1'
      },
      body: {
          id: '1' ,
          nombre: "Link",
          franquicia: "Legend of Zelda",
          descripcion: "Heroe de Nintendo"
      }
    }
    const nextMock = sandbox.stub()
    characters.push({
        "id": "1",
        "nombre": "Link",
        "franquicia": "Legend of Zelda",
        "descripcion": "Heroe de Nintendo"
        
    });


    const resMock = {
      status: statusMock,
      json: jsonMock
    }

    getOneCharcter(reqMock, resMock, nextMock)
    sinon.assert.calledWith(statusMock, 204)
    sinon.assert.calledWith(jsonMock, characters)
  });

  
  //Agregar Personaje 
  it('Agregar Personaje', () => {
    
  });


});