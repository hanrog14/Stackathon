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
            socket.emit('correctGuess', this.props.room, guess)
        }
    }

    render() {
        return (
            <div id="guesses">
                <h1>Guesses: </h1>
                <hr />
                {this.props.guesses.map((guess, i) => {
                    if (this.props.hasOwnProperty('card')) this.checkGuess(guess)
                    return <p key={i}>{guess.player.name} guessed {guess.name}</p>
                })}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        guesses: state.guesses,
        room: state.room    }
}

export default connect(mapStateToProps)(Guesses)