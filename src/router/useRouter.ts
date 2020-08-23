import { useContext } from 'react';
import RouterContext from './RouterContext';
import type { RouterType } from './types';

function useRouter(): RouterType {
  const router = useContext(RouterContext);

  if (router === undefined) {
    throw new Error('useRouter must be used within a Router');
  }

  return router;
}

export default useRouter;
