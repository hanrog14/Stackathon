import {createStore, applyMiddleware} from 'redux'
import loggingMiddleware from 'redux-logger' 
import thunkMiddleware from 'redux-thunk'
import axios from 'axios'

//initial state
const initialState = {allPlayers: [], player: {}, room: '', gameState: '', curPlayer: {}, images: [], guesses: [], card: {}}

//action types
const GOT_NEW_PLAYER = 'GOT_NEW_PLAYER'
const GOT_MY_PLAYER = 'GOT_MY_PLAYER'
const GOT_ROOM = 'GOT_ROOM'
const GOT_GAME_STATE = 'GOT_GAME_STATE'
const GOT_NEXT_PLAYER = 'GOT_NEXT_PLAYER'
const GOT_IMAGE = 'GOT_IMAGE'
const GOT_GUESS = 'GOT_GUESS'
const GOT_CARD = 'GOT_CARD'

//action creators
export const gotNewPlayer = (player) => ({type: GOT_NEW_PLAYER, player})
export const gotPlayer = (player) => ({type: GOT_MY_PLAYER, player})
export const gotRoom = (room) => ({type: GOT_ROOM, room})
export const gotGameState = (gameState) => ({type: GOT_GAME_STATE, gameState})
export const gotNextPlayer = (player) => ({type: GOT_NEXT_PLAYER, player})
export const gotImage = (img) => ({type: GOT_IMAGE, img})
export const gotGuess = (guess) => ({type: GOT_GUESS, guess})
export const gotCard = (card) => ({type: GOT_CARD, card})

// thunk creators
export const getCard = () => {
    return async (dispatch) => {
        try {
            const id = Math.floor(Math.random() * 20)
            const res = await axios.get(`/api/card/${id}`)
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
            return {...state, curPlayer: action.player, images: [], guesses: [], card: {}}
        case GOT_IMAGE:
            return {...state, images: [...state.images, action.img]}
        case GOT_GUESS:
            return {...state, guesses: [...state.guesses, action.guess]}
        case GOT_CARD:
            return {...state, card: action.card}
        default:
            return state;
    }
}


export default createStore(
    reducer,
    applyMiddleware(
        thunkMiddleware.withExtraArgument({axios}),
        loggingMiddleware
    )
)
