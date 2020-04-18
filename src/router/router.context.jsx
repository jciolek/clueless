import * as React from 'react';

const RouterContext = React.createContext();

function withRouter(Component) {
  return function ComponentWithRouter(props) {
    return (
      <RouterContext.Consumer>
        {(router) => <Component {...props} router={router} />}
      </RouterContext.Consumer>
    );
  };
}

export default RouterContext;
export { withRouter };
