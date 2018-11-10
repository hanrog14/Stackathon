import React from 'react'
import {connect} from 'react-redux'
import socket from '../socket'

class Guesses extends React.Component {
    constructor() {
        super()
        this.checkGuess = this.checkGuess.bind(this)
    }

    checkGuess(guess) {
        if (guess.name === this.props.card.name) {
            socket.emit('nextPlayerTurn', this.props.room, this.props.player)
        }
    }

    render() {
        return (
            <div id="guesses">
                <h1>Guesses: </h1>
                <ul>
                    {this.props.guesses.map((guess, i) => {
                        if (this.props.hasOwnProperty('card')) this.checkGuess(guess)
                        return <li key={i}>{guess.name}</li>
                    })}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        guesses: state.guesses,
        room: state.room,
        player: state.player
    }
}

export default connect(mapStateToProps)(Guesses)