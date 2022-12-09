const express = require('express')
const app = express()
let port = process.env.PORT || 3000

const mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient

//const MongoClient = require('mongodb').MongoClient

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// CONECTAR A UNA BASE DE DATOS: con esta conexion obligamos a Mongo a utilizar el nuevo sistema para leer las url de Mongo
MongoClient.connect('mongodb://127.0.0.1:27017', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, })
    .then(client => { 
    console.log(`MongoDB se ha conectado`) 
    app.locals.db = client.db('clase') 
}).catch(err=> console.log(`MongoDB no conectado. Error: ${err}`))





app.listen(port, err => {
    err
        ? console.error('Error al cargar el servidor')
        : console.log('Estoy a la escucha en el http://localhost:' + port)
})