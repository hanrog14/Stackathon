import React from 'react'
import {connect} from 'react-redux'
import socket from '../socket';
import Guesses from './Guesses'

class GuesserView extends React.Component {
    constructor() {
        super()
        this.state = {
            guess: '',
            curIdx: 0
        }
        this.handleChange = this.handleChange.bind(this)
        this.submitGuess = this.submitGuess.bind(this)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.images.length !== this.props.images.length) {
            this.setState({curIdx: this.props.images.length - 1})
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitGuess() {
        socket.emit('submitGuess', this.props.room, this.props.player, this.state.guess)
        this.setState({guess: ''})
    }

    nextPic(addVal) {
        const newVal = this.state.curIdx + addVal
        if (newVal >= 0 && newVal < this.props.images.length) {
            this.setState({curIdx: newVal})
        }
    }

    render() {
        return (
            <div id="drawerView">
                <h1>Guess the picture!</h1>
                {this.props.images.length ?
                    <div>
                        <div id="mainView">
                            <div id="whiteboard">
                                <img src={`${this.props.images[this.state.curIdx]}`} /> 
                                <button type="button" onClick={() => this.nextPic(-1)}>Prev</button>
                                <button type="button" onClick={() => this.nextPic(1)}>Next</button>
                            </div>
                            <Guesses />
                        </div>
                        <input name="guess" type="text" onChange={this.handleChange} value={this.state.guess} />
                        <button type="button" onClick={this.submitGuess}>Submit Guess</button> 
                    </div> :
                    <p>Waiting for images to be submitted... </p>
                }
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