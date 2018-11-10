const {db, Card} = require('./server/db')
const {green, red} = require('chalk')

const cards = [
    {name: 'cat', tags: 'kitten kitty cats'},
    {name: 'elephant', tags: 'mammoth elephants mammoths'},
    {name: 'umbrella', tags: 'canopy umbrellas canopies'},
    {name: 'dancing', tags: 'dance dancer danced'},
    {name: 'horse', tags: 'horsey pony horses'},
    {name: 'door', tags: 'doors'},
    {name: 'treasure', tags: 'treasures'},
    {name: 'baseball', tags: 'baseballs'},
    {name: 'dominos', tags: 'domino'},
    {name: 'toast', tags: 'toasted toasting'},
    {name: 'rollerblading', tags: 'rollerblade rollerblades'},
    {name: 'cake', tags: 'cakes'},
    {name: 'queen', tags: 'queens'},
    {name: 'bicycle', tags: 'bike bikes bicycling biking bicycles'},
    {name: 'password', tags: 'passwords'},
    {name: 'bomb', tags: 'bombs explosive explosives'},
    {name: 'pirate', tags: 'pirates'},
    {name: 'plane', tags: 'planes aircraft aircrafts'},
    {name: 'photograph', tags: 'picture pictures photographs'},
    {name: 'computer', tags: 'computers'}
]

const seed = async () => {
    await db.sync({force: true})
  
    // seed your database here!
    await Promise.all(cards.map(card => Card.create(card)))
  
    console.log(green('Seeding success!'))
    db.close()
  }
  
seed()
    .catch(err => {
      console.error(red('Oh no! Something went wrong!'))
      console.error(err)
      db.close()
    })