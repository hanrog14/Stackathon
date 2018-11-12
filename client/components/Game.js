import React from 'react'
import socket from '../socket';
import GameBoard from './GameBoard'
import GameOver from './GameOver'
import {connect} from 'react-redux'

class Game extends React.Component {

    constructor() {
        super()
        this.state = {
            rounds: '',
            errMessage: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.startGame = this.startGame.bind(this)
    }

    handleChange(event) {
        this.setState({
            rounds: parseInt(event.target.value, 10)
        })
    }

    startGame() {
        if (this.state.rounds > 0) {
            socket.emit('startGame', this.props.room, this.props.allPlayers, this.state.rounds)
        } else {
            this.setState({errMessage: 'Enter number of rounds to play before beginning'})
        }
    }

    render() {
        return (
            <div>
                {this.props.gameState === 'playing' ?
                    <GameBoard /> :
                    this.props.gameState === 'gameOver' ?
                    <GameOver /> :
                    <div>
                        {this.props.player && this.props.player.creator ?
                            <div>
                                <h1>Room ID: {this.props.room}</h1>
                                <p>Please share the room ID with your friends, so they can join the room.</p>
                                <p>When everyone is here, enter the number of rounds you would like to play,</p>
                                <p>and click the button below to start the game!</p>
                                <hr />
                                {this.props.allPlayers.map((player, i) => <p key={i}>{player.name} has joined the room!</p>)}
                                <hr />
                                <label>Rounds:</label>
                                <input type="text" name="rounds" value={this.state.rounds} onChange={this.handleChange} />
                                <br />
                                <button type="button" onClick={this.startGame}>All Players are Here!</button>
                                {this.state.errMessage && <p id="errMessage">{this.state.errMessage}</p>}
                            </div>
                            :
                            <div>
                                <h1>Welcome to {this.props.room}</h1>
                                <p>We are currently waiting for more players to join, the room creator will start the game when everyone has joined. Sit tight!</p>
                            </div>
                        }
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        room: state.room,
        gameState: state.gameState,
        allPlayers: state.allPlayers,
        player: state.player
    }
}

export default connect(mapStateToProps)(Game)
