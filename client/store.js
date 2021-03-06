import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import axios from 'axios'

//initial state
const initialState = {
    allPlayers: [],
    player: {},
    room: '',
    gameState: '',
    curPlayer: {},
    images: [],
    guesses: [],
    card: {},
    cardIdx: 1,
    correctGuess: false,
    guessInfo: {},
    badImage: false
}

//action types
const GOT_NEW_PLAYER = 'GOT_NEW_PLAYER'
const GOT_MY_PLAYER = 'GOT_MY_PLAYER'
const GOT_ROOM = 'GOT_ROOM'
const GOT_GAME_STATE = 'GOT_GAME_STATE'
const GOT_NEXT_PLAYER = 'GOT_NEXT_PLAYER'
const GOT_IMAGE = 'GOT_IMAGE'
const GOT_GUESS = 'GOT_GUESS'
const GOT_CARD = 'GOT_CARD'
const GOT_CORRECT_GUESS = 'GOT_CORRECT_GUESS'
const GOT_SCORES = 'GOT_SCORES'
const GOT_BAD_IMAGE = 'GOT_BAD_IMAGE'
const SET_BAD_IMAGE = 'SET_BAD_IMAGE'

//action creators
export const gotNewPlayer = (player) => ({type: GOT_NEW_PLAYER, player})
export const gotPlayer = (player) => ({type: GOT_MY_PLAYER, player})
export const gotRoom = (room) => ({type: GOT_ROOM, room})
export const gotGameState = (gameState) => ({type: GOT_GAME_STATE, gameState})
export const gotNextPlayer = (player, cardIdx) => ({type: GOT_NEXT_PLAYER, player, cardIdx})
export const gotImage = (img) => ({type: GOT_IMAGE, img})
export const gotGuess = (guess) => ({type: GOT_GUESS, guess})
export const gotCard = (card) => ({type: GOT_CARD, card})
export const gotCorrectGuess = (guess) => ({type: GOT_CORRECT_GUESS, guess})
export const gotScores = (players) => ({type: GOT_SCORES, players})
export const gotBadImage = () => ({type: GOT_BAD_IMAGE})
export const setBadImage = (val) => ({type: SET_BAD_IMAGE, val})

// thunk creators
export const getCard = (idx) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/api/card/${idx}`)
            dispatch(gotCard(res.data))
        } catch (err) {console.error(err)}
    }
}

//reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GOT_NEW_PLAYER:
            return {...state, allPlayers: [...state.allPlayers, action.player]}
        case GOT_MY_PLAYER:
            return {...state, player: action.player, allPlayers: [...state.allPlayers, action.player]}
        case GOT_ROOM:
            return {...state, room: action.room}
        case GOT_GAME_STATE:
            return {...state, gameState: action.gameState}
        case GOT_NEXT_PLAYER:
            return {...state, curPlayer: action.player, cardIdx: action.cardIdx, images: [], guesses: [], card: {}, correctGuess: false, guessInfo: {}, badImage: false}
        case GOT_IMAGE:
            return {...state, images: [...state.images, action.img]}
        case GOT_GUESS:
            return {...state, guesses: [...state.guesses, action.guess]}
        case GOT_CARD:
            return {...state, card: action.card}
        case GOT_CORRECT_GUESS:
            return {...state, correctGuess: true, guessInfo: action.guess}
        case GOT_SCORES:
            return {...state, allPlayers: action.players}
        case GOT_BAD_IMAGE:
            return {...state, badImage: true}
        case SET_BAD_IMAGE:
            return {...state, badImage: action.val}
        default:
            return state;
    }
}

export default createStore(
    reducer,
    applyMiddleware(
        thunkMiddleware.withExtraArgument({axios})
    )
)
