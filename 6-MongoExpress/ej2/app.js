const express = require('express')
const app = express()
let port = process.env.PORT || 3000

const MongoClient = require('mongodb').MongoClient

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))

MongoClient.connect('mongodb://127.0.0.1:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(client => {
        console.log(`MongoDB se ha conectado`)
        app.locals.db = client.db('clase')
    }).catch(err => console.log(`MongoDB no conectado. Error: ${err}`))


// ruta GET para mostrar todas las mesas que tenemos en nuestra BD

app.get('/api/libros', (req, res) =>
    app.locals.db.collection('libros').find().toArray((err, data) => {
        err
            ? res.send({ mesanje: "Error al consultar la base de datos", data: err })
            : res.send({ mesanje: "Busqueda efectuada", results: data })
    }
    ))

app.get('/api/libros/:titulo', (req, res) =>
    app.locals.db.collection('libros').find({ titulo: req.params.titulo }).toArray((err, data) => {
        err
            ? res.send({ mesanje: "Error al leer la base de datos", data: err })
            : res.send({ mesanje: data.length > 0 ? "Busqueda efectuada" : "No se ha encontrado " + req.params.titulo, results: data })
    }
    ))    


//creamos una ruta POST para rellenar la base de datos

app.post('/api/nuevoLibro/:titulo', (req, res) => {
    app.locals.db.collection('libros').find({ titulo: req.params.titulo }).toArray((err, data) => {
        if (err) {
            res.send({ mesanje: "Error al insertar en la base de datos", data: err })
        } else {
            data.length > 0
                ? res.send({ mesanje: "El libro ya se encuentra en la base de datos", data: data })
                : (app.locals.db.collection('libros').insertOne({ titulo: req.params.titulo, leido: false }, (err, data) => {
                    err
                        ? res.send({ mesanje: "Error al insertar en la base de datos", data: err })
                        : res.send({ mesanje: "Grabado correctamente", data: data })
                }))
        }
    })
})


// ruta PUT Todas las mesas del color indicado en la ruta cambiarán su color a granate

app.put('/api/editarLibro/:titulo', (req, res) => {
    app.locals.db.collection('libros').updateOne({ titulo: req.params.titulo }, { $set: { leido: true } }, (err, data) => {
        err
            ? res.send({ mesanje: "Error al modificar el estado de " + req.params.titulo, data: err })
            : res.send({ modificado: data.modifiedCount > 0, mesanje: data.modifiedCount > 0 ? "Se ha modificado correctamente el estado de " + req.params.titulo : "No ha podido modificarse el estado de " + req.params.titulo, results: data })
    })
})

// ruta DELETE borrará las mesas con el número de patas indicado

app.delete('/api/borrarLibro/:titulo', (req, res) => {
    app.locals.db.collection('libros').deleteOne({ titulo: req.params.titulo }, (err, data) =>
        err
            ? res.send({ mesanje: "Error al borrar en la base de datos", data: err })
            : res.send({ mesanje: data.deletedCount > 0 ? "Borrado correctamente " +req.params.titulo : "No se ha encontrado ningun libro con el titulo " + req.params.titulo, data: data }))
})






app.listen(port, err => {
    err
        ? console.error('Error al cargar el servidor')
        : console.log('Estoy a la escucha en el http://localhost:' + port)
})
