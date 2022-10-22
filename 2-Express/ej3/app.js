const express = require('express')
const app = express()
let port = process.env.PORT || 3000

let personas = ['Cris', 'Nacho', 'Bea', 'Bruno', 'Dani']

app.get('/persona', (req, res)=>{
    let html =""
    personas.forEach((persona, i)=>{
      html += `<li>${persona}</li>`  
        
    })
    res.send(`<ul>${html}</ul>`)
})


app.listen(port, err =>{
    err
    ? console.error('He fallado')
    : console.log('Estoy funcionando en https://localhost:' + port)
})