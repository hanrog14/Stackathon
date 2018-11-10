import React from 'react'
import {connect} from 'react-redux'
import socket from '../socket';
import Guesses from './Guesses'

class GuesserView extends React.Component {
    constructor() {
        super()
        this.state = {
            guess: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.submitGuess = this.submitGuess.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitGuess() {
        console.log('submitting guess', this.props.room)
        socket.emit('submitGuess', this.props.room, this.props.player, this.state.guess)
    }

    render() {
        return (
            <div>
                <h1>I AM THE GUESSER</h1>
                {this.props.images.map((img, i) => <img key={i} src={`${img}`} />)}
                <Guesses />
                <input name="guess" type="text" onChange={this.handleChange} value={this.state.guess} />
                <button type="button" onClick={this.submitGuess}>Submit Guess</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        images: state.images,
        room: state.room,
        player: state.player
    }
}

export default connect(mapStateToProps)(GuesserView)