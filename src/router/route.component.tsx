import * as React from 'react';
import { matchRoute } from './utils';
import type { RouteType, RouterType } from './types';

type Props = {
  router: RouterType;
  route: RouteType;
  children: React.ReactNode;
};

function Route({ route, router: { path }, children }: Props): React.ReactNode {
  return matchRoute(route, path) ? children : null;
}

export default Route;
