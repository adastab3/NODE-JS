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

// ruta GET /api/series que nos devuelta todas las series y puntuaciones

app.get('/api/series', (req, res) => {
    app.locals.db.collection('series').find().toArray((err, data) => {
        err
            ? res.send({ mensaje: 'Error al consultar en la base de datos', data: err })
            : res.send({ mensaje: `Solicitud aceptada`, results: data })

    })

})

//ruta GET /api/:serie que devuelva la informacion de una unica serie. Crear un formulario para introducir la serie que quieres buscar

app.get('/api/series/:serie', (req, res) => {
    app.locals.db.collection('series').find({titulo: req.params.serie}).toArray((err, data) => {
        console.log(data)
        err
            ? res.send({ mensaje: 'Error al consultar en la base de datos', data: err })
            : data.length < 1
                ? res.send({ mensaje: `La serie ${req.params.serie} no existe en la base de datos`, data: data }) 
                : res.send({ mensaje: "Búsqueda satiscfactoria", data: data })

    })

})

//Busqueda con querys
/*app.get('/api/serie', (req, res) => {
    app.locals.db.collection('series').find({titulo:req.query.titulo}).toArray((err, data) => {
        err
            ? res.send({ mensaje: 'Error al consultar en la base de datos', data: err })
            : data.length < 1
                ? res.send({ mensaje: `La serie ${req.query.serie} no existe en la base de datos`, data: data }) 
                : res.send({ mensaje: `Búsqueda satisfactoria`, results: data })

    })

})*/



//ruta POST /api/nuevaSerie que añada una nueva serie a la coleccion. Envia datos usando un formulario en HTML

app.post('/api/nuevaSerie', (req, res) => {
    app.locals.db.collection('series').find({ titulo: req.body.titulo }).toArray((err, data) => {
        err
            ? res.send({ mensaje: 'Error al consultar la base de datos', data: err })
            : data.length > 0
                ? res.send({ mensaje: `La serie ${req.body.titulo} ya existe en la base de datos`, data: data })
                : app.locals.db.collection('series').insertOne({ titulo: req.body.titulo, plataforma: req.body.plataforma, nota: parseInt(req.body.nota) }, (err, data) => {
                    err
                        ? res.send({ mensaje: 'Error al consultar en la base de datos', data: err })
                        : res.send({ mensaje: `${req.body.titulo} se ha insertado correctamente en la base de datos`, results: data })
                })

    })


})






app.listen(port, err => {
    err
        ? console.error('He fallado')
        : console.log('Estoy funcionando en https://localhost:' + port)
})