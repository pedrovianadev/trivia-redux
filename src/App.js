import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Game from './pages/Game';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

class App extends React.Component {
  render() {
    return (
      <div id="App">
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/settings" component={ Settings } />
          <Route exact path="/game" component={ Game } />
          <Route exact path="/feedback" component={ Feedback } />
          <Route exact path="/Ranking" component={ Ranking } />
        </Switch>
      </div>

    );
  }
}

export default App;
