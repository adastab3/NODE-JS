const express = require('express')
const app = express()
let port = process.env.PORT || 3000




app.listen(port, err =>{
    err
    ? console.error('He fallado')
    : console.log('Estoy funcionando en https://localhost:' + port)
})

app.get('/', (req, res) => {
    res.send("<h1>Hola Mundo!</h1>>/br><h2>desde express</h2>")
})