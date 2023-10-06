const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://dbCaue:3nQWAvBVQdcNwmj8@cluster0.b6ouvnb.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);
const database = client.db('teste');
const usuario = database.collection('usuario');

async function createUsers(objectData) {
    try {
      const create = await usuario.insertOne(objectData);
      return create;
    } finally {
      await client.close();
    }
    
}
async function listarUsers() {
    try {
      const
      
      listar = await usuario.find().toArray();
      return listar;
    } finally {
      await client.close();
    }
    
}
 
module.exports = { createUsers, listarUsers }