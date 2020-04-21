import * as React from 'react';
import { useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from '@/redux-store/actions';
import { StateType } from '@/redux-store/types';
import RouterContext from './router.context';
import type { PathType } from './types';

type Props = {
  children: React.ReactNode;
};

function selector(state: StateType): PathType {
  return state.router.path;
}

function Router({ children }: Props): React.ReactNode {
  const dispatch = useDispatch();
  const currPath = useSelector(selector);

  const onNavigate = useCallback(
    (path) => {
      // @ts-ignore
      // We cannot infer the actions types at the moment.
      dispatch(actions.router.navigate({ path }));
    },
    [dispatch]
  );

  const router = useMemo(
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
