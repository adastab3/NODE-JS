const express = require('express')
const app = express()
let port = process.env.PORT || 3000
const MongoClient = require('mongodb').MongoClient
const fileUpload = require('express-fileupload')

MongoClient.connect('mongodb://127.0.0.1:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(client =>{
    console.log(`MONGODB se ha conectado`)
    app.locals.db = client.db('clase')
}).catch(err => console.log(`MONGODB no conectado. Error ${err}`))

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(express.static('public'))
app.use(fileUpload({createParentPath: true, safeFileNames: true}))



app.listen(port, err => {
    err
        ? console.error('He fallado')
        : console.log('Estoy funcionando en http://localhost:' + port)
})