import React from 'react'
import createSocket from '../socket';
import history from '../history'

class CreateGroup extends React.Component {
    constructor() {
        super()
        this.state = {
            groupName: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({
            groupName: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        history.push(`${this.state.groupName}/game`)
        this.setState({groupName: ''})
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Enter GroupName Here</label>
                <input type="text" onChange={this.handleChange} value={this.state.groupName} />
                <button type="submit">Submit</button>
            </form>
        )
    }
}

export default CreateGroup