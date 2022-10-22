const express = require('express')
const app = express()

let port = process.env.PORT || 3000

//Imports
let animales = require('./animales')

app.use(express.static('public'))

//1. Lista de animales en la ruta '/'

app.get(('/', (req, res)=>{
    /*let html =""
    animales.forEach((animal, i) => {
        html += `<li>${animal.nombre}</li>`    
    });
    res.send(`<ul>${html}</ul>`)*/
    res.send(console.log(animales))
}))


//2. Crear una segunda ruta que reciba por query nombre, tipo y edad del animal

app.get(('/sumar-animal', (req, res)=>{
    
    animales.push({nombre:`${req.query.nombre}`, edad:`${req.query.edad}`, tipo:`${req.query.tipo}`})
    res.send(`<li>${req.query.nombre}</li>`)

}))






app.listen(port, err =>{
    err
    ? console.error('He fallado')
    : console.log('Estoy funcionando en https://localhost:' + port)
})