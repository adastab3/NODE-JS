const express = require('express')
const app = express()


app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//Imports
let personas = require ('./personas')

app.get('/personas', (req, res)=>{
    
    res.send({personas})

})

app.post('/personas', (req,res)=>{
    let nombre = req.body.personas[0].nombre
    res.send('Hola ' + nombre)
})


let port = process.env.PORT || 3000
app.listen(port, err =>{
    err
    ? console.error('He fallado')
    : console.log('Estoy funcionando en http://localhost:' + port)
})