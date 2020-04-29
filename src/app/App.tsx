import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { Route, Redirect, Switch } from '@/router';
import PlayerListContainer from '@/players/player-list.container';
import PieceListContainer from '@/pieces/piece-list.container';
import NotesContainer from '@/game/notes.container';
import Steps from '@/steps/Steps';

function App() {
  return (
    <div className="grid-container">
      <div className="grid-x grid-margin-x grid-padding-x">
        <div className="cell small-12">
          <h1>Cluedo notes</h1>
          <Steps />
          <Switch>
            <Route route="/pieces">
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

export default hot(App);
