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



