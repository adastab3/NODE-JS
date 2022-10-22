const express = require('express')
const app = express()
let port = process.env.PORT || 3000

let objeto = {
    nombre: "",
    apellido: "",
    edad: 0
}

app.get('/', (req, res)=>{
    res.send(objeto)
})

app.get('/nombre/:nombre', (req, res)=>{
objeto.nombre = req.params.nombre
res.send("<a href='http://localhost:3000'>Ir a Inicio</a>")
/* res.redirect('http://localhost:3000') */

})

app.get('/apellido/:apellido', (req, res)=>{
    objeto.apellido = req.params.apellido
    res.send("<a href='http://localhost:3000'>Ir a Inicio</a>")
    
    })

app.get('/edad/:edad', (req, res)=>{
        objeto.edad = parseInt(req.params.edad)
        res.send("<a href='http://localhost:3000'>Ir a Inicio</a>")
        
        })


app.listen(port, err => {
    err
        ? console.error('He fallado')
        : console.log('Estoy funcionando en http://localhost:' + port)
})