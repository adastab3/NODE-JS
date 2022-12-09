//1. Crea una consulta en la que aparezca el pokémon con el ‘num’ 132.
db.samples_pokemon.find({num:'132'})

//2. Crea una consulta en la que aparezcan los pokémon de ‘type’ ‘Poison’.
db.samples_pokemon.find({type:'Poison'})

//3. Crea una consulta en la que aparezcan los pokémon que tengan avg_spawn igual a 4.2.
db.samples_pokemon.find({avg_spawns:4.2})

//4. Crea una consulta en la que aparezcan los pokémon con ‘candy_count’ entre 20 y 40.
db.samples_pokemon.find({$and:[{candy_count:{$gte: 20}},{candy_count:{$lte: 40}}]})

//5. Crea una consulta en la que aparezcan con los pokémon con ‘spawn_chance’ mayor que 0.088.
db.samples_pokemon.find({spawn_chance:{$gt: 0.088}})

//6.Crea una consulta en la que aparezcan sólo 10 pokémon ordenados por peso de mayor a menor
db.samples_pokemon.find().sort({weight:-1}).limit(10)

//7. Crea una consulta en la que aparezcan los pokémon que tengan la propiedad ‘num’ del atributo ‘next_evolution’ igual a 003.
db.samples_pkemon.find({next_evolution: {$elemMatch: {num:"003"}}})

//8. Crea una consulta en la que aparezcan los pokémon que tengan ‘candy_count’ igual o mayor que 25 y ‘avg_spawns’ mayor que 5.
db.samples_pokemon.find({$and: [{candy_count: {$gte:25}}, {avg_spawn: {$gt: 5}}]})

//9. Crea una consulta en la que aparezcan los pokémon que tengan ‘weaknesses’ igual a ‘Ground’ y ‘multipliers’ igual a null
db.samples_pkemon.find({$and: [{weaknesses: "Ground"},{multipliers: null}]})

//10. Crea una consulta en la que aparezcan los pokémon ordenados por la propiedad “avg_spawns” de manera descendente.
db.samples_pkemon.find().sort({avg_spawns: -1})

//11. Crea una consulta en la que aparezcan los pokémon que tengan ‘candy_count’ menor que 100. Ordénalos de mayor a menor.
db.samples_pkemon.find({candy_count: {$lt:100}}).sort({candy_count:1})

//12. Crea una consulta en la que aparezcan los pokémon que tengan ‘egg’ igual a ‘Not in Eggs’.
db.samples_pkemon.find({egg:'Not in Eggs'})

//13. Crea una consulta en la que aparezcan los pokémon que tengan ‘multipliers’ igual a ‘null’ o ‘candy_count’ mayor o igual a 100.
db.samples_pkemon.find({$or:[{multipliers: null},{candy_count:{$gte:100}}]})

//14. Crea una consulta en la que aparezcan los pokémon que tengan candy_count mayor que 25, ‘spawn_time’ menor que 15 y avg_spawns mayor que 40.
db.samples_pkemon.find({$and:[{candy_count:{$gt:25}},{spawn_time:{$lt:"15:00"}},{avg_spawns:{$gt:40}}]})

//15. Crea una consulta en la que aparezcan los pokémon que tengan ‘candy_count’ mayor a 50. Limita la búsqueda a 3 pokémon.
db.samples_pkemon.find({candy_count:{$gt:50}}).limit(3)

//16. Crea una consulta en la que aparezcan los pokémon que sea de ‘type’ ‘Ground’ y no tengan de ‘weaknesses’‘Grass’.
db.samples_pkemon.find({$and:[{type:"Ground"},{weaknesses:{$ne:'Grass'}}]})

//17. Crea una consulta en la que aparezcan los pokémon ordenados por candy_count de mayor a menor.
db.samples_pkemon.find().sort({candy_count:-1})

//18. Crea una consulta en la que aparezca los pokémon ordenados por spawn_chance de menor a mayor.
db.samples_pkemon.find().sort({spawn_chance: 1})

//19. Crea una consulta en la que aparezca tu pokémon favorito (búscalo por nombre). Si no tienes pokémon favoritoo no conoces ninguno, encuentra a Charizard
db.samples_pkemon.find({name: "Charizard"})

/*{
    _id: ObjectId("58f56171ee9d4bd5e610d657"),
    id: 20,
    num: '020',
    name: 'Raticate',
    img: 'http://www.serebii.net/pokemongo/pokemon/020.png',
    type: [ 'Normal' ],
    height: '0.71 m',
    weight: '18.5 kg',
    candy: 'Rattata Candy',
    egg: 'Not in Eggs',
    spawn_chance: 0.41,
    avg_spawns: 41,
    spawn_time: '01:56',
    multipliers: null,
    weaknesses: [ 'Fighting' ],
    prev_evolution: [ { num: '019', name: 'Rattata' } ]
  }
  */
