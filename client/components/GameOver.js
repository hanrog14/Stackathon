import React from 'react'
import {connect} from 'react-redux'

const GameOver = (props) => {
    return (
        <div>
            <h1>Final Scores:</h1>
            {props.allPlayers.map((player, i) => <p key={i}>{player.name}: {player.score}</p>)}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        allPlayers: state.allPlayers
    }
}

export default connect(mapStateToProps)(GameOver)
