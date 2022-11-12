const express = require('express')
const app = express()

//Imports
let personas = require('./personas')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())



app.get('/personas', (req, res) => {

    res.send(personas)

})

app.post('/agregar', (req, res) => {
    let persona = req.body
    personas.push(persona)
    res.send({mensaje:"Persona añadida", status: 200})
})

app.put('/modificar', (req, res)=>{
    let i = personas.findIndex(persona => persona.nombre === req.body.nombre)
    if (i < 0){
    res.send({mensaje: "No se ha encontrado a " + req.body.nombre})
}else{
    personas[i].nombre = req.body.nombre
    personas[i].apellido = req.body.apellido
    personas[i].edad = req.body.edad
    res.send({mensaje:`Se ha modificado a ${req.body.nombre} en la base de datos`, status: 200})
}

})

app.delete('/borrar', (req, res)=>{
    let i = personas.findIndex(persona => persona.nombre === req.body.nombre)
    if (i < 0){
    res.send({mensaje: "No se ha encontrado a " + req.body.nombre})
}else{
    personas.splice(i,1)
    res.send({mensaje:`Se ha borrado a ${req.body.nombre} de la base de datos`, status: 200})
}

})


let port = process.env.PORT || 3000
app.listen(port, err => {
    err
        ? console.error('He fallado')
        : console.log('Estoy funcionando en http://localhost:' + port)
})