import React from 'react'
import socket from '../socket'

class Main extends React.Component {
    constructor() {
        super()
        this.state = {
            name: '',
            id: '',
            errMessage: null
        }
        this.handleChange = this.handleChange.bind(this)
        this.createRoom = this.createRoom.bind(this)
        this.joinRoom = this.joinRoom.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    createRoom() {
        if (this.state.name !== '') {
            socket.emit('create-room', this.state.name);
            this.props.history.push('/game')
        } else {
            this.setState({errMessage: 'Please fill in name field to create a room'})
        }
    }

    joinRoom() {
        if (this.state.name !== '' && this.state.id !== '') {
            socket.emit('join-room', this.state.id, this.state.name)
            this.props.history.push('/game')
        } else {
            this.setState({errMessage: 'Please fill in name and room id to join a room'})
        }
    }

    render() {
        return (
            <div id="welcome">
                <h1>Welcome to Picture This!</h1>
                <p>Please enter your name below</p>
                <label>Name</label>
                <input name="name" value={this.state.name} onChange={this.handleChange} type="text" />
                <hr />
                <p>If you would like to create a new room, click here!</p>
                <button type="submit" onClick={this.createRoom}>Create A Game Room!</button>
                <hr />
                <p>If you would like to join an existing room, enter the room ID, and click here!</p>
                <label>Room ID</label>
                <input name="id" value={this.state.id} onChange={this.handleChange} type="text" /> <br />
                <button type="submit" onClick={this.joinRoom}>Join A Game Room!</button>
                <hr />
                {this.state.errMessage && <p id="errMessage">{this.state.errMessage}</p>}
            </div>
        )
    }
}

export default Main