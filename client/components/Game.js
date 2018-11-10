import React from 'react'
import socket from '../socket';
import GameBoard from './GameBoard'
import {connect} from 'react-redux'

class Game extends React.Component {

    constructor() {
        super()
        this.startGame = this.startGame.bind(this)
    }

    startGame() {
        socket.emit('startGame', this.props.room, this.props.allPlayers)
    }

    render() {
        return (
            <div>
                {this.props.gameState === 'playing' ?
                    <GameBoard /> :
                    <div>
                        {this.props.player && this.props.player.creator ?
                            <div>
                                <h1>Room ID: {this.props.room}</h1>
                                <ul>
                                    {this.props.allPlayers.map((player, i) => <li key={i}>Player {player.name} has joined!</li>)}
                                </ul>
                                <p>Please share the room ID with your friends, so they can join! When everyone is here, click the button below to start the game!</p>
                                <button type="button" onClick={this.startGame}>All Players are Here!</button> 
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
