const express = require('express')
const app = express()
let port = process.env.PORT || 3000

let array = ['Manu', 'Sandra', 'Rafa', 'Vane', 'Vir', 'Olga']

app.get('/agregar/:nombre', (req, res)=>{
    array.push(req.params.nombre)
    res.send(array)
    
})




app.listen(port, err =>{
    err
    ? console.error('He fallado')
    : console.log('Estoy funcionando en https://localhost:' + port)
})