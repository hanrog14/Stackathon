import React from 'react'
import {connect} from 'react-redux'
import socket from '../socket'

class CorrectGuess extends React.Component {

    componentDidMount() {
        setTimeout(() => {
            if (this.props.player.name === this.props.curPlayer.name) {
                socket.emit('nextPlayerTurn', this.props.room, this.props.player)
            }
        }, 5000)
    }

    render() {
        return (
            <div>
                <h1>Congratulations!</h1>
                <p>{this.props.guess.player.name} has guessed correctly!</p>
                <p>The card was {this.props.guess.name}</p>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        player: state.player,
        room: state.room,
        guess: state.guessInfo,
        curPlayer: state.curPlayer
    }
}

export default connect(mapStateToProps)(CorrectGuess)