let createdRooms = {};
let roomsCreated = 0;

class Player {
  constructor(name, creator) {
      this.name = name
      this.creator = creator
  }

  changeName(name) {
    this.name = name
  }
}

module.exports = io => {

    io.on('connection', socket => {

      console.log(socket.id, ' has made a persistent connection to the server!');

      socket.on('create-room', (name) => {
        console.log(`created a room with id ${roomsCreated}`)
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

      socket.on('startGame', (room, allPlayers) => {
        socket.broadcast.to(room).emit('gameStateChange', 'playing')
        socket.emit('gameStateChange', 'playing')
        createdRooms[room] = allPlayers
        socket.broadcast.to(room).emit('nextPlayer', allPlayers[0])
        socket.emit('nextPlayer', allPlayers[0])
      })

      socket.on('nextPlayerTurn', (roomId, curPlayer) => {
        const room = createdRooms[roomId]
        let curIdx = room.findIndex(player => player.name === curPlayer.name)
        if (curIdx === room.length - 1) curIdx = -1
        socket.broadcast.to(roomId).emit('nextPlayer', room[curIdx + 1])
        socket.emit('nextPlayer', room[curIdx + 1])
      })

      socket.on('pictureSubmitted', (roomId, img) => {
        socket.broadcast.to(roomId).emit('gotPicture', img);
      })

      socket.on('submitGuess', (roomId, player, guess) => {
        socket.broadcast.to(roomId).emit('gotGuess', {name: guess, player: player})
      })
    });
}