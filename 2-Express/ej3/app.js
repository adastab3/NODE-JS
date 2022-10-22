const express = require('express')
const app = express()
let port = process.env.PORT || 3000

let personas = ['Cris', 'Nacho', 'Bea', 'Bruno', 'Dani']

app.get('/persona', (req, res) => {
    let html = ""
    personas.forEach((persona, i) => {
        html += `<li>${persona}</li>`

    })
    res.send(`<ul>${html}</ul>`)
})

app.get('/persona/:nombre', (req,res)=>{
    /*personas.includes(req.params.nombre)
    ? res.send(`${req.params.nombre}`)
    : res.send(`No se ha encontrado a ${req.params.nombre}`)*/

    personas.forEach((persona, i)=>{
        nombre === req.params.nombre
        ? res.send (personas[i])
        : res.send("No hemos encontrado a esa persona")
    })
})

app.listen(port, err => {
    err
        ? console.error('He fallado')
        : console.log('Estoy funcionando en https://localhost:' + port)
})