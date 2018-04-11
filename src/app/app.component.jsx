// @flow
import * as React from 'react';
import PlayerListContainer from '../players/player-list.container';
import PieceListContainer from '../pieces/piece-list.container';
import NotesContainer from '../game/notes.container';
import { Route, Redirect, Switch } from '../router';
import StepsContainer from '../steps/steps.container';

function App() {
  return (
    <div className="grid-container">
      <div className="grid-x grid-margin-x grid-padding-x">
        <div className="cell small-12">
          <h1>Cluedo notes</h1>
          <StepsContainer />
          <Switch>
            <Route route="/pieces" isDefault>
              <PieceListContainer />
            </Route>
            <Route route="/players">
              <PlayerListContainer />
            </Route>
            <Route route="/game">
              <NotesContainer />
            </Route>
            <Redirect path="/pieces" />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
