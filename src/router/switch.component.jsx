// @flow
import * as React from 'react';
import { matchRoute } from './utils';
import type { RouterType } from './types';

type Props = {
  children: React.Node,
  router: RouterType
};

function Switch(props: Props) {
  const { children, router: { path } } = props;
  const matchingRoute = React.Children.toArray(children).find((child) =>
    matchRoute(child.props.route, path)
  );

  return matchingRoute || null;
}

export default Switch;
