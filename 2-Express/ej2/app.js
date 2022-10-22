const express = require('express')
const app = express()
let port = process.env.PORT || 3000

app.get('/aleatorio/:numero', (req, res) => {

    res.send(Math.floor(Math.random() * (parseInt(req.params.numero) - 1) + 1))

})




app.listen(port, err => {
    err
        ? console.error('He fallado')
        : console.log('Estoy funcionando en https://localhost:' + port)
})