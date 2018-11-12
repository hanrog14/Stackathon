const visualRecognition = require('../visRecog');
const fs = require('fs');

let createdRooms = {};
let roomsCreated = 0;

if (process.env.NODE_ENV !== 'production') require('../../secrets')

class Player {
  constructor(name, creator) {
      this.name = name
      this.creator = creator
      this.score = 0
  }

  updateScore(score) {
    this.score += score
  }
}

module.exports = io => {

    io.on('connection', socket => {

      console.log(socket.id, ' has made a persistent connection to the server!');

      socket.on('create-room', (name) => {
        roomsCreated++;
        const newRoom = `room-${roomsCreated}`;
        const player = new Player(name, true)
        socket.join(newRoom);
        socket.emit('joined-room', {room: newRoom, player: player})
      });

      socket.on('join-room', (id, name) => {
        const player = new Player(name, false)
        socket.join(id);
        socket.broadcast.to(id).emit('new-player', player)
        socket.emit('joined-room', {room: id, player: player})
      })

      socket.on('startGame', (room, allPlayers, rounds) => {
        socket.broadcast.to(room).emit('gameStateChange', 'playing')
        socket.emit('gameStateChange', 'playing')
        createdRooms[room] = {players: allPlayers, rounds: rounds, cardIdx: 1}
        socket.broadcast.to(room).emit('nextPlayer', allPlayers[0], 1)
        socket.emit('nextPlayer', allPlayers[0], 1)
      })

      socket.on('nextPlayerTurn', (roomId, curPlayer) => {
        createdRooms[roomId].cardIdx++;
        if (createdRooms[roomId] > 20) createdRooms[roomId] = 1
        const roomPlayers = createdRooms[roomId].players
        let curIdx = roomPlayers.findIndex(player => player.name === curPlayer.name)
        if (curIdx === roomPlayers.length - 1) {
          createdRooms[roomId].rounds--;
          curIdx = -1
        }
        if (createdRooms[roomId].rounds === 0) {
          socket.broadcast.to(roomId).emit('finalScores', createdRooms[roomId].players)
          socket.emit('finalScores', createdRooms[roomId].players)
          socket.broadcast.to(roomId).emit('gameStateChange', 'gameOver')
          socket.emit('gameStateChange', 'gameOver')
        } else {
          socket.broadcast.to(roomId).emit('nextPlayer', roomPlayers[curIdx + 1], createdRooms[roomId].cardIdx)
          socket.emit('nextPlayer', roomPlayers[curIdx + 1], createdRooms[roomId].cardIdx)
        }
      })

      socket.on('pictureSubmitted', async (roomId, img) => {
        let base64Image = img.split(';base64,').pop();
        await fs.writeFile('image.png', base64Image, {encoding: 'base64'}, function(err) {
          if (err) {
            console.error(err)
          } else {
            const images_file= fs.createReadStream('image.png');
            const owners = ["me"];
            const threshold = 0.8;
    
            const params = {
              images_file: images_file,
              owners: owners,
              threshold: threshold,
            };
    
            visualRecognition.classify(params, function(err, response) {
              if (err) { 
                socket.broadcast.to(roomId).emit('gotPicture', img);
              } else {
                if (response.images[0].classifiers[0].classes.length) {
                  socket.emit('badImage')
                } else {
                  socket.broadcast.to(roomId).emit('gotPicture', img);
                }
              }
            });
          }
        });
      })

      socket.on('submitGuess', (roomId, player, guess) => {
        socket.broadcast.to(roomId).emit('gotGuess', {name: guess, player: player})
        socket.emit('gotGuess', {name: guess, player: player})
      })

      socket.on('correctGuess', (roomId, guess) => {
        let playerIdx = createdRooms[roomId].players.findIndex(player => player.name === guess.player.name)
        createdRooms[roomId].players[playerIdx].score += 10;
        socket.broadcast.to(roomId).emit('guessCorrect', guess)
        socket.emit('guessCorrect', guess)
      })
    });
}