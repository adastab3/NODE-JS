const express = require('express')
const app = express()
let port = process.env.PORT || 3000

//Imports
let array = requiere ('./modules/array')
let aleatorio = require('./modules/funcion')

app.get('/', (req, res)=>{
    let rnd = aleatorio()
    /*for (let i = 0; i < array.length; i++) {
        if(i= rnd){
            array[i]++
        }   
    }*/
    array[rnd]++
    res.send(array)
})


app.listen(port, err =>{
    err
    ? console.error('He fallado')
    : console.log('Estoy funcionando en https://localhost:' + port)
})