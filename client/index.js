import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Game, Main } from './components';
import './socket'

ReactDOM.render(
  <Provider store={store}>
      <Router>
        <Switch>
            <Route path="/game" component={Game} />
            <Route exact path="/" component={Main} />
        </Switch>
      </Router>
  </Provider>,
  document.getElementById('app')
);