// @flow
import * as React from 'react';
import type { RouterType } from './types/router';
import type { PathType } from './types/path';

type Props = {
  path: PathType,
  router: RouterType
};

class Redirect extends React.Component<Props> {
  componentDidMount() {
    const { path, router } = this.props;

    router.onNavigate(path);
  }

  render() {
    return null;
  }
}

export default Redirect;
