// @flow
import * as React from 'react';
import { matchRoute } from './utils';
import type { RouteType, RouterType } from './types';

type Props = {
  router: RouterType,
  route: RouteType,
  children: React.Node,
};

function Route(props: Props) {
  const {
    route,
    router: { path },
    children,
  } = props;

  return matchRoute(route, path) ? children : null;
}

export default Route;
