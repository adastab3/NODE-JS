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
    useUnifiedTopology: true,
})
    .then(client => {
        console.log(`MongoDB se ha conectado`)
        app.locals.db = client.db('clase')
    }).catch(err => console.log(`MongoDB no conectado. Error: ${err}`))

//creamos una ruta POST para rellenar la base de datos

app.post('/api/anyadir', (req, res) => {
    app.locals.db.collection('mesas').insertOne(req.body, (err, data) => {
        err
            ? res.send({ mesanje: "Error en la base de datos", data: err })
            : res.send({ mesanje: "Grabado correctamente", data: data })
    })
})

// ruta GET para mostrar todas las mesas que tenemos en nuestra BD

app.get('/api/mesas', (req, res) =>
    app.locals.db.collection('mesas').find().toArray((err, data) => {
        err
            ? res.send({ mesanje: "Error al leer la base de datos", data: err })
            : res.send({ mesanje: "Busqueda efectuada", results: data })
    }
    ))

// ruta PUT Todas las mesas del color indicado en la ruta cambiarán su color a granate

app.put('/api/modificar/:color', (req, res) => {
    app.locals.db.collection('mesas').updateMany({ color: req.params.color }, { $set: { color: "granate" } }, (err, data) => {
        err
            ? res.send({ mesanje: "Error al modificar la base de datos", data: err })
            : res.send({ mesanje: data.modifiedCount > 0 ? "Modificado correctamente" : "Ninguna coincidencia", data: data })
    })
})

// ruta DELETE borrará las mesas con el número de patas indicado

app.delete('/api/borrar/:patas', (req, res) => {
    app.locals.db.collection('mesas').deleteMany({ patas: parseInt(req.params.patas) }, (err, data) =>
        err
            ? res.send({ mesanje: "Error al borrar en la base de datos", data: err })
            : res.send({ mesanje: data.deletedCount > 0 ? "Borrado correctamente" : "No se ha encontrado ninguna mesa con ese numero de patas", data: data }))
})




app.listen(port, err => {
    err
        ? console.error('Error al cargar el servidor')
        : console.log('Estoy a la escucha en el http://localhost:' + port)
})