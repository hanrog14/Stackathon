import io from 'socket.io-client';
import store, {gotPlayer, gotRoom, gotGameState, gotNextPlayer, gotNewPlayer, gotImage, gotGuess} from './store'

const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log(`I am now connected to the server !`);
});

socket.on('joined-room', (roomInfo) => {
  console.log(`Player ${roomInfo.player} joined room ${roomInfo.room}`)
  store.dispatch(gotPlayer(roomInfo.player))
  store.dispatch(gotRoom(roomInfo.room))
})

socket.on('new-player', (player) => {
  store.dispatch(gotNewPlayer(player))
})

socket.on('nextPlayer', (nextPlayer) => {
  console.log(`Player completed turn, next player is ${nextPlayer}`)
  store.dispatch(gotNextPlayer(nextPlayer))
})

socket.on('gameStateChange', (gameState) => {
  console.log(`Game state changed to ${gameState}`)
  store.dispatch(gotGameState(gameState))
})

socket.on('gotPicture', (img) => {
  store.dispatch(gotImage(img))
})

socket.on('gotGuess', (guess) => {
  store.dispatch(gotGuess(guess))
})

export default socket