import React from 'react'
import socket from '../socket';
import {connect} from 'react-redux'
import DrawerView from './DrawerView'
import GuesserView from './GuesserView'

class GameBoard extends React.Component {

    render() {
        return (
            <div>
                {this.props.player.name === this.props.curPlayer.name ?
                    <DrawerView /> :
                    <GuesserView />
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        room: state.room,
        player: state.player,
        curPlayer: state.curPlayer
    }
}

export default connect(mapStateToProps)(GameBoard)