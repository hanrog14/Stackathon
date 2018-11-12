import React from 'react'
import {connect} from 'react-redux'
import DrawerView from './DrawerView'
import GuesserView from './GuesserView'
import CorrectGuess from './CorrectGuess'

class GameBoard extends React.Component {

    render() {
        return (
            <div>
                {this.props.correctGuess ?
                    <CorrectGuess /> :
                    <div>
                        <h1>{this.props.curPlayer.name} is up!</h1>
                        {this.props.player.name === this.props.curPlayer.name ?
                            <DrawerView /> :
                            <GuesserView />
                        }
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        player: state.player,
        curPlayer: state.curPlayer,
        correctGuess: state.correctGuess
    }
}

export default connect(mapStateToProps)(GameBoard)