import * as React from 'react';
import { matchRoute } from './utils';
import type { RouteComponent, RouteElement } from './types';
import useRouter from './useRouter';

const Route: RouteComponent = ({ route, children = null }) => {
  const { path } = useRouter();

  return matchRoute(route, path) && children ? <>{children}</> : null;
};

function isRouteElement(node: React.ReactNode): node is RouteElement {
  return React.isValidElement(node) && 'route' in node.props;
}

export default Route;
export { isRouteElement };
