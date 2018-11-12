import {EventEmitter} from 'events'
import React from 'react'
import socket from '../socket'
import {connect} from 'react-redux'
import { setBadImage } from '../store';

class Whiteboard extends React.Component {
    constructor() {
        super()
        this.state = {
            mouseDown: false,
            curPosition: [],
            lastPosition: []
        }
        this.mouseDownEvt = this.mouseDownEvt.bind(this)
        this.mouseUpEvt = this.mouseUpEvt.bind(this)
        this.mouseMoving = this.mouseMoving.bind(this)
        this.draw = this.draw.bind(this)
        this.submitDrawing = this.submitDrawing.bind(this)
    }
    
    componentDidMount() {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.canvas.width = window.innerWidth/2;
        ctx.canvas.height = window.innerHeight*2/3;
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.lineWidth = 5
    }

    mouseDownEvt(event) {
        const canvasStart = event.target.getBoundingClientRect();
        const xPos = event.clientX - canvasStart.left;
        const yPos = event.clientY - canvasStart.top;
        this.setState({mouseDown: true, curPosition: [xPos, yPos]})
    }

    mouseUpEvt(event) {
        this.setState({mouseDown: false})
        this.setState({curPosition: [], lastPosition: []})
    }

    mouseMoving(event) {
        if (this.state.mouseDown) {
            const lastPos = this.state.curPosition
            const canvasStart = event.target.getBoundingClientRect();
            const xPos = event.clientX - canvasStart.left;
            const yPos = event.clientY - canvasStart.top;
            this.setState({curPosition: [xPos, yPos], lastPosition: lastPos})
            if (this.state.curPosition.length === 2 && this.state.lastPosition.length === 2) {
                this.draw()
            }
        }
    }

    draw() {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.beginPath()
        ctx.strokeStyle = 'black'
        ctx.moveTo(...this.state.curPosition)
        ctx.lineTo(...this.state.lastPosition)
        ctx.closePath()
        ctx.stroke()
    }

    submitDrawing() {
        this.props.setBadImage(false);
        const ctx = this.refs.canvas.getContext('2d');
        socket.emit('pictureSubmitted', this.props.room, this.refs.canvas.toDataURL("image/png"))
        ctx.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height)
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    }

    render() {
        return (
            <div>
                <canvas ref="canvas" onMouseDown={this.mouseDownEvt} onMouseMove={this.mouseMoving} onMouseUp={this.mouseUpEvt}/>
                <button type="button" onClick={this.submitDrawing}>Submit Drawing!</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        room: state.room
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setBadImage: (val) => dispatch(setBadImage(val))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Whiteboard)