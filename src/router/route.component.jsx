// @flow
import * as React from 'react';
import type { RouteType } from './route.type';

type Props = {
  route: RouteType,
  activeRoute: RouteType,
  children: React.Node
};

function Route(props: Props) {
  const { route, activeRoute, children } = props;

  return route === activeRoute ? children : null;
}

export default Route;
