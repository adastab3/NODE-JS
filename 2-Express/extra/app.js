const express = require('express')
const app = express()
let port = process.env.PORT || 3000

//import
const almacen = require('./modules/almacen')
let cesta = []

app.get('/', (req, res) => {
    res.send(almacen)
})

//Creamos una ruta para cada departamento: /ropa y /accesorios

app.get('/ropa', (req, res) => {
    let html = ""
    almacen[0].productos.forEach(producto => (html += `<tr><<td>${producto.nombre}</td><td>${producto.precio}</td><td>${producto.stock}</td></tr>`))
    res.send(`<table><tr><th>Producto</th><th>Precio</th><th>Stock</th></tr>${html}</table>`)

})

app.get('/accesorios', (req, res) => {
    let html = ""
    almacen[1].productos.forEach(producto => (html += `<tr><<td>${producto.nombre}</td><td>${producto.precio}</td><td>${producto.stock}</td></tr>`))
    res.send(`<table><tr><th>Producto</th><th>Precio</th><th>Stock</th></tr>${html}</table>`)

})

//Para no tener que crear una ruta por cada departamento, por si en un futuro tenemos mas departamentos, podemos crear un parámetro :departamento
app.get('/departamento/:departamento', (req, res) => {
    let html = ""
    let index = almacen.findIndex((departamento)=>departamento.nombre===req.params.departamento)
    if(index < 0){
        res.send("No existe el departamento: " +req.params.departamento)
    }else{
        almacen[index].productos.forEach(producto => (html += `<tr><<td>${producto.nombre}</td><td>${producto.precio}</td><td>${producto.stock}</td></tr>`))
    }

    
    res.send(`<table><tr><th>Producto</th><th>Precio</th><th>Stock</th></tr>${html}</table>`)

})


app.get('/:departamento/:nombre/:cantidad', (req, res) => {
    let departamento = almacen.find(departamento => departamento.nombre === req.params.departamento)
    let departamentoIndex = almacen.findIndex(
        departamento => departamento.nombre === req.params.departamento
    )

    if (departamento === undefined) {
        res.send("No existe el departamento")
    } else {
        let producto = departamento.productos.find(producto => producto.nombre === req.params.nombre)

        let productoIndex = departamento.productos.findIndex((producto) => producto.nombre === req.params.nombre)

        if (producto === undefined) {
            res.send("No encontramos ese producto")
        } else {
            if (producto.stock < req.params.cantidad) {
                res.send("No podemos servirte esa cantidad. El máximo es: " + producto.stock)

            } else {
                cesta.push({ nombre: producto.nombre, cantidad: req.params.cantidad })
                almacen[departamentoIndex].productos[productoIndex].stock =
                    almacen[departamentoIndex].productos[productoIndex].stock - req.params.cantidad
                res.send(almacen[departamentoIndex].productos[productoIndex])



            }
        }
    }
})


app.get('/cesta', (req, res)=>{
    if(cesta.length < 1){
        res.send("Cesta vacía")
    }else{
        let html =""
        cesta.forEach((producto)=>html += `<tr><<td>${producto.nombre}</td><td>${producto.cantidad}</td></tr>`)

        res.send(`<table><tr><th>Producto</th><th>Cantidad</th></tr>${html}</table>`

        )
    }

})

app.get('/checkout', (req, res)=>{
    cesta.length > 0
    ? (cesta = [], res.send("Compra realizada"))
    : res.send ("Cesta vacía.")
})





app.listen(port, err => {
    err
        ? console.error('He fallado')
        : console.log('Estoy funcionando en https://localhost:' + port)
})