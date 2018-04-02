// @flow
import * as React from 'react';
import PlayerListContainer from '../players/player-list.container';
import PieceListContainer from '../pieces/piece-list.container';
import NotesContainer from '../game/notes.container';
import RouteContainer from '../router/route.container';
import StepsContainer from '../steps/steps.container';
import type { RouteType } from '../router/types/route';

type Props = {
  onNavigate: (route: RouteType) => void
};

class App extends React.Component<Props> {
  componentDidMount() {
    this.props.onNavigate('/pieces');
  }

  render() {
    return (
      <div className="grid-container">
        <div className="grid-x grid-margin-x grid-padding-x">
          <div className="cell small-12">
            <h1>
              Clueless <small>no more</small>
            </h1>
            <StepsContainer />
            <RouteContainer route="/pieces">
              <PieceListContainer />
            </RouteContainer>
            <RouteContainer route="/players">
              <PlayerListContainer />
            </RouteContainer>
            <RouteContainer route="/game">
              <NotesContainer />
            </RouteContainer>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
