import * as React from 'react';
import { Route, Redirect, Switch } from '@/router';
import PlayerListContainer from '@/players/PlayerList';
import PieceList from '@/pieces/PieceList';
import NotesContainer from '@/game/notes.container';
import Steps from '@/steps/Steps';

function App(): JSX.Element {
  return (
    <div className="grid-container">
      <div className="grid-x grid-margin-x grid-padding-x">
        <div className="cell small-12">
          <h1>Cluedo notes</h1>
          <Steps />
          <Switch>
            <Route route="/pieces">
              <PieceList />
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
