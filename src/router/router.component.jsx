// @flow
import * as React from 'react';
import { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RouterContext from './router.context';
import type { PathType, RouterType } from './types';
import actions from '../redux-store/actions';

type Props = {
  children: React.Node,
};

function selector(state): PathType {
  return state.router.path;
}

function Router({ children }: Props) {
  const dispatch = useDispatch();
  const currPath = useSelector(selector);

  const onNavigate = useCallback(
    (path) => {
      dispatch(actions.router.navigate({ path }));
    },
    [dispatch]
  );

  const router: RouterType = useMemo(
    () => ({
      onNavigate,
      path: currPath,
    }),
    [onNavigate, currPath]
  );

  return (
    <RouterContext.Provider value={router}>{children}</RouterContext.Provider>
  );
}

export default Router;
