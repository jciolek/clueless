import { useContext } from 'react';
import RouterContext from './RouterContext';

function useRouter() {
  const router = useContext(RouterContext);

  if (router === undefined) {
    throw new Error('useRouter must be used within a Router');
  }

  return router;
}

export default useRouter;
