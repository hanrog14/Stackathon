import io from 'socket.io-client';
import store, {gotPlayer, gotRoom, gotGameState, gotNextPlayer, gotNewPlayer, gotImage, gotGuess, gotCorrectGuess, gotScores, gotBadImage} from './store'

const socket = io(window.location.origin);

socket.on('joined-room', (roomInfo) => {
  store.dispatch(gotPlayer(roomInfo.player))
  store.dispatch(gotRoom(roomInfo.room))
})

socket.on('new-player', (player) => {
  store.dispatch(gotNewPlayer(player))
})

socket.on('nextPlayer', (nextPlayer, cardIdx) => {
  store.dispatch(gotNextPlayer(nextPlayer, cardIdx))
})

socket.on('gameStateChange', (gameState) => {
  store.dispatch(gotGameState(gameState))
})

socket.on('finalScores', (allPlayers) => {
  store.dispatch(gotScores(allPlayers))
})

socket.on('gotPicture', (img) => {
  store.dispatch(gotImage(img))
})

socket.on('gotGuess', (guess) => {
  store.dispatch(gotGuess(guess))
})

socket.on('guessCorrect', (guess) => {
  store.dispatch(gotCorrectGuess(guess))
})

socket.on('badImage', () => {
  store.dispatch(gotBadImage())
})

export default socket