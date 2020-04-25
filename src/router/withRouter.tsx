import * as React from 'react';
import { RouterType } from './types';
import RouterContext from './RouterContext';

type Props = {
  router: RouterType;
};

function withRouter(Component: React.ComponentType<Props>) {
  return function ComponentWithRouter(props: object) {
    return (
      <RouterContext.Consumer>
        {(router) => {
          if (!router) {
            throw new Error('withRouter must be used within a Router');
          }

          return <Component {...props} router={router} />;
        }}
      </RouterContext.Consumer>
    );
  };
}

export default withRouter;
