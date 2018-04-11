// @flow
import * as React from 'react';
import { matchRoute } from './utils';
import type { RouteType } from './types/route';
import type { RouterType } from './types/router';

type Props = {
  router: RouterType,
  route: RouteType,
  children: React.Node
};

function Route(props: Props) {
  const { route, router: { path }, children } = props;

  return matchRoute(route, path) ? children : null;
}

export default Route;
