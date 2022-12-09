//1. Crea una consulta en la que aparezcan los capítulos de la temporada 1.
db.samples_friends.find({season: 1})

//2. Crea una consulta en la que aparezcan todos los capítulos con una hora de emisión(airtime) igual a 20:00.
db.samples_friends.find({airtime:'20:00'})

//3. Crea una consulta en la que aparezcan todos los capítulos que tengan en el nombre una “w”
db.samples_friends.find({name:/w/i})

//4. Crea una consulta en la que aparezca el primer capítulo de la temporada 2.
db.samples_friends.find({$and:[{season: 2},{number: 1}]})

//5. Crea una consulta en la que aparezcan los primeros 5 capítulos.
db.samples_friends.find().sort({season: 1, number: 1}).limit(5)
db.samples_friends.find({$and:[{season: 1},{number: {$lte:5}}]})

//6. Crea una consulta en la que aparezcan todos los capítulos que empiecen por “The One”.
db.samples_friends.find({name: /^The One/})

//7. Crea una consulta en la que aparezcan los capítulos que protagoniza Chandler (buscar en el name)
db.samples_friends.find({name: /Chandler/})

//8. Crea una consulta en la que aparezcan todos los capítulos de la tercera temporada en los que sale Ross.
db.samples_friends.find({$and:[{season:3},{name: /Ross/}]})

/* {
    _id: ObjectId("58f56189ee9d4bd5e610d6ee"),
    id: 40665,
    url: 'http://www.tvmaze.com/episodes/40665/friends-1x20-the-one-with-the-evil-orthodontist',
    name: 'The One With the Evil Orthodontist',
    season: 1,
    number: 20,
    airdate: '1995-04-06',
    airtime: '20:00',
    airstamp: '1995-04-06T20:00:00-04:00',
    runtime: 30,
    image: {
      medium: 'http://static.tvmaze.com/uploads/images/medium_landscape/23/59123.jpg',
      original: 'http://static.tvmaze.com/uploads/images/original_untouched/23/59123.jpg'
    },
    summary: "<p>Chandler's not a very smooth operator when it comes to calling a woman \n" +
      'he went out with; Rachel gets involved with her ex-fiancé.</p>',
    _links: { self: { href: 'http://api.tvmaze.com/episodes/40665' } }
  }
 */