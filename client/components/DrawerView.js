import React from 'react'
import Whiteboard from './Whiteboard'
import {connect} from 'react-redux'
import Guesses from './Guesses'
import {getCard} from '../store'

class DrawerView extends React.Component {
    componentDidMount() {
        this.props.getCard()
    }

    render() {
        return (
            <div id="drawerView">
                <div id="card">
                    {this.props.card.name ?
                    <h1>Your Card is: {this.props.card.name}</h1>:
                    <h1>Picking Card...</h1>}
                </div>
                <div id="mainView">
                    <div id="whiteboard">
                        <Whiteboard />
                    </div>
                    <Guesses card={this.props.card}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        guesses: state.guesses,
        card: state.card
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCard: () => dispatch(getCard())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerView)
