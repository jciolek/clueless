import React from 'react';
import PlayerListContainer from '../players/player-list.container';

/* eslint-disable */
class App extends React.Component {
  render() {
    return <div className="grid-container">
      <div className="grid-x grid-margin-x grid-padding-x">
        <div className="cell small-12">
          <h1>Clueless <small>no more</small></h1>
          <PlayerListContainer />
        </div>
      </div>
    </div>;
  }
}

export default App;
