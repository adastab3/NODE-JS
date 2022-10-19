let objeto = require('./objeto')

let arrayPaises = objeto.paises.a.concat(objeto.paises.b)
arrayPaises = arrayPaises.concat(objeto.paises.c)

//let array = objeto.paises.a.concat(objeto.paises.b, objeto.paises.c)

console.log(arrayPaises)
console.log(arrayPaises[objeto.favoritos[0]])
console.log(arrayPaises[objeto.favoritos[1]])
console.log(arrayPaises[objeto.favoritos[2]])