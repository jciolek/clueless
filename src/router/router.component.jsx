// @flow
import * as React from 'react';
import RouterContext from './router.context';
import type { PathType } from './types/path';
import type { RouterType } from './types/router';

type Props = {
  path: PathType,
  onNavigate: (PathType) => void,
  children: React.Node
};

type State = RouterType;

class Router extends React.Component<Props, State> {
  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const { path } = nextProps;

    if (path === prevState.path) {
      return null;
    }

    return { path };
  }

  /* eslint-disable react/no-unused-state */
  state = {
    onNavigate: this.handleNavigate.bind(this),
    path: this.props.path
  };

  handleNavigate(path: PathType) {
    this.props.onNavigate(path);
  }

  render() {
    return (
      <RouterContext.Provider value={this.state}>
        {this.props.children}
      </RouterContext.Provider>
    );
  }
}

export default Router;
