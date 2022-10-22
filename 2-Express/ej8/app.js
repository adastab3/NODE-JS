const express = require('express')
const app = express()
let port = process.env.PORT || 3000

//Imports
let array = requiere ('./modules/array')
let aleatorio = require('./modules/funcion')

app.get('/', (req, res)=>{
    let rnd = aleatorio()
   
    array[rnd]++
    res.send(array)
})

app.get('/borrar/:indice', (req, res)=>{
    req.params.indice >=0 && req.params.indice <= 9
    ? ((array[req.params.indice]) = 0, res.send(array))
    : res.send("Introduce un parametro correcto")

})



app.listen(port, err =>{
    err
    ? console.error('He fallado')
    : console.log('Estoy funcionando en https://localhost:' + port)
})