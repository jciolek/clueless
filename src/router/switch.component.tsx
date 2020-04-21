import * as React from 'react';
import { matchRoute } from './utils';
import { RouterType } from './types';

type Props = {
  children: React.ReactElement;
  router: RouterType;
};

function Switch(props: Props) {
  const {
    children,
    router: { path },
  } = props;
  const matchingRoute = React.Children.toArray(children).find((child) =>
    // @ts-ignore
    matchRoute(child.props.route, path)
  );

  return matchingRoute || null;
}

export default Switch;
