    
import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {IndividualGameList, CreateGroup, Main, Game} from '.'

const Routes = () => {
    console.log('in routes')
    return (
        <div>
            <nav>
                Welcome!
            </nav>
            <main>
                <Switch>
                    {/* <Route path="/individual" component={IndividualGameList} /> */}
                    <Route path="/game" component={Game} />
                    {/* <Route path="/:room/game" component={Game} /> */}
                    <Route exact path="/" component={Main} />
                </Switch>
            </main>
        </div>
    )
}

export default Routes