import React from 'react'
import {Link} from 'react-router-dom'
import socket from '../socket'

class Main extends React.Component {
    constructor() {
        super()
        this.state = {
            name: '',
            id: ''
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
        socket.emit('create-room', this.state.name);
    }

    joinRoom() {
        console.log(this.state.id)
        socket.emit('join-room', this.state.id, this.state.name)
    }

    render() {
        return (
            <div>
                <label>Name</label>
                <input name="name" value={this.state.name} onChange={this.handleChange} type="text" />
                <hr />
                <label>Room ID</label>
                <input name="id" value={this.state.id} onChange={this.handleChange} type="text" />
                <button type="button" onClick={this.joinRoom}><Link to="/game">Join A Game Room!</Link></button>
                <hr />
                <button type="button" onClick={this.createRoom}><Link to="/game">Create A Game Room!</Link></button>
                <hr />
            </div>
        )
    }
}

export default Main