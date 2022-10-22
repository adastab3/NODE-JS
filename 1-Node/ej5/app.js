let objeto = require('./objeto')

let arrayPaises = objeto.paises.a.concat(objeto.paises.b)
arrayPaises = arrayPaises.concat(objeto.paises.c)

//let array = objeto.paises.a.concat(objeto.paises.b, objeto.paises.c)

console.log(arrayPaises)
console.log(arrayPaises[objeto.favoritos[0]])
console.log(arrayPaises[objeto.favoritos[1]])
console.log(arrayPaises[objeto.favoritos[2]])

//otra solucion de clase:
/*let objeto = require('./objeto')
let array = objeto.paises.a.concact(objeto.paises.b, objeto.paises.c)
fot(let i=0; 1<objeto.favoritos.length: i++){
    console.log(array[objeto.favoritos[i]])
}
console.log(array[objeto.favoritos[0]], array[objeto.favoritos[1]], array[objeto.favoritos[2]])
 */
