import * as React from 'react';
import { matchRoute } from './utils';
import useRouter from './useRouter';
import { SwitchChild } from './types';
import { isRouteElement } from './Route';
import { isRedirectElement } from './Redirect';

type Props = {
  children?: React.ReactNode;
};

function isSwitchChild(node: React.ReactNode): node is SwitchChild {
  return isRouteElement(node) || isRedirectElement(node);
}

function Switch({ children }: Props): JSX.Element | null {
  const { location } = useRouter();
  const switchChildren = React.Children.toArray(children).filter<SwitchChild>(
    isSwitchChild
  );

  for (let i = 0; i < switchChildren.length; i += 1) {
    const child = switchChildren[i];

    if (
      isRouteElement(child) &&
      matchRoute(child.props.route, location.pathname)
    ) {
      return child;
    }

    if (isRedirectElement(child)) {
      return child;
    }
  }

  return null;
}

export default Switch;
export { isSwitchChild };
