const { MongoClient } = require('mongodb');
const mongoose=require('mongoose');
require('dotenv').config();
const validator = require('validator');

//REST API :Representational State Transfer : web application qui permettre un client a acceder et manipuler des ressources en utilisnt des opperations
// API :  outi pour nous aider à programmer (module npm/fs:pour lie et ecrire sur un fichier)

async function connectDb() {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Data base Connected...');

   

}


module.exports ={
    connectDb
}