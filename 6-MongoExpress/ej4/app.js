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

// ruta GET que muestre todos los menus /api/menus    
app.get('/api/menus', (req, res) => {
    app.locals.db.collection('restaurante').find().toArray((err, data) => {
        err
            ? res.send({ mensaje: 'Error al consultar en la base de datos', data: err })
            : res.send({ mensaje: 'Solicitud aceptada', results: data })
    })
})

//ruta POST /api/nuevoMenu para añadir un nuevo menu

app.post('/api/nuevoMenu', (req, res) => {
    app.locals.db.collection('restaurante').find({ numero: parseInt(req.body.numero) }).toArray((err, data) => {
        err
            ? res.send({ error: true, mensaje: "Conexión fallida a la base de datos", data: err })
            : data.length > 0
                ? res.send({ error: true, mensaje: "El menú ya existe", results: data })
                : app.locals.db.collection('restaurante').insertOne({
                    numero: parseInt(req.body.numero),
                    pp: req.body.pp,
                    sp: req.body.sp,
                    pos: req.body.pos,
                    precio: parseFloat(req.body.precio)
                },
                    (err, data) => {
                        err
                            ? res.send({ error: true, mensaje: "Operación fallida en la base de datos", data: err })
                            : res.send({ error: false, mensaje: `Menú nº ${req.body.numero} añadido a la base de datos` })
                    }
                )

    })
})

//ruta PUT /api/editarMenu para modificar un menu existente

app.put('/api/editarMenu', (req, res) => {
    app.locals.db.collection('restaurante').updateOne({ numero: parseInt(req.body.numero) },
        {
            $set: {
                pp: req.body.pp,
                sp: req.body.sp,
                pos: req.body.pos,
                precio: parseFloat(req.body.precio)
            }
    }, (err, data) => {
        err
            ? res.send({ error: true, mensaje: " Conexion fallida a la base de datos", data: err })
            : data.matchedCount < 1
                ? res.send({ error: true, mensaje: " Menu no existe en la base de datos", data: data })
                : data.modifiedCount < 1
                    ? res.send({ error: true, mensaje: " Menu no modificado en la base de datos", data: data })
                    : res.send({ error: false, mensaje: `Menú nº ${req.body.numero} modificado en la base de datos`, data: data })
    })
})


//ruta DELETE /api/borrarMenu para borrar un menu existente

app.delete('/api/borrarMenu', (req,res)=>{
    app.locals.db.collection('restaurante').deleteOne({ numero: parseInt(req.body.numero)}, (err,data)=>{
        err
         ? res.send({ error:true, mensaje: 'Error al consultar la base de datos', data: err})
         : data.deletedCount < 1
            ? res.send({ error: true, mensaje: 'No se ha encontrado en la base de datos', data: data})
            : res.send({
                error: false,
                mensaje: `Menú nº ${req.body.numero} borrado de la BBDD`,
                results: data
            })
    })
})


app.listen(port, err => {
    err
        ? console.error('He fallado')
        : console.log('Estoy funcionando en https://localhost:' + port)
})