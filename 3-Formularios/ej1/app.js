const express = require('express')
const app = express()

//Imports
let animales = require('./animales')

app.use(express.static('public'))

//1. Lista de animales en la ruta '/'

/*app.get('/', (req, res)=>{
    let html = ''
    animales.forEach(animal =>(
        html += `<tr><td>${animal.nombre}</td><td>${animal.edad}</td><td>${animal.tipo}</td></tr>`)    
    )
    res.send(`<table><tr><th>NOMBRE</th><th>EDAD</th><th>TIPO</th></tr>${html}</table>`)
    
})*/


//2. Crear una segunda ruta que reciba por query nombre, tipo y edad del animal

app.get('/sumar-animal', (req, res)=>{
    let animal = {
        nombre: req.query.nombre, edad: parseInt(req.query.edad), tipo: req.query.tipo
    }
    animales.push(animal)
    res.send(`<h3>${req.query.nombre} añadido a la base de datos</h3>`)
})


//3. crear una tercera ruta /dejar-animal en la que mostraremos un formulario en el que el usuario de la página puede introducir el nombre, el tipo y la edad de un animal

app.get('/dejar-animal', (req, res)=>{
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <h1>Dejar animal en adopción</h1>
        <p>Inscribe a tu animal en la lista de adopciones:</p>
        <form action="/sumar-animal">
            <p>Nombre del animal:</p><input type="text" name="nombre" /></br>
            <p>Edad del animal:</p><input type="text" name="edad" /></br>
            <p>Tipo de animal:</p> <input type="text" name="tipo" /></br>
            <button type="submit">Enviar</button>
    
        </form>
        
    </body>
    </html>`)
})

//4. Crear una ruta  /adoptar que recibe un nombre de animal por parámetro de query. Cuando llegue una petición a esta ruta, eliminaremos el animal con este nombre de la lista de animales que hay en el servidor.

app.get('/adoptar', (req, res)=>{
    let index = animales.findIndex(animal=> animal.nombre === req.query.nombre)
    index > 0
    ? (animales.splice(index,1), res.send("Animal adoptado!!")) //Método Splice extrae , el número indica cuántos queremos extraer
    : res.send("No hemos encontrado al animal")

})

//5. Añadir un botón que diga adoptar y mostrarlo en la lista de animales que se muestra en la raíz (un botón por animal, con un campo name con el valor del nombre del animal), cuando pulsemos el botón, se enviará el formulario a la ruta /adoptar.

app.get('/', (req, res)=>{
    let html = ''
    animales.forEach(animal =>(
        html += `<tr><td>${animal.nombre}</td><td>${animal.edad}</td><td>${animal.tipo}</td><td><form action="/adoptar"><input type="text" name="nombre" value="${animal.nombre}" hidden /><button type="">Adoptar</button></form></td>
        </tr>`)    
    )
    res.send(`<table><tr><th>NOMBRE</th><th>EDAD</th><th>TIPO</th></tr>${html}</table>`)
    
})



let port = process.env.PORT || 3000
app.listen(port, err =>{
    err
    ? console.error('He fallado')
    : console.log('Estoy funcionando en https://localhost:' + port)
})