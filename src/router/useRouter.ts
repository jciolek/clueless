import { useContext } from 'react';
import RouterContext from './router.context';

function useRouter() {
  return useContext(RouterContext);
}

export default useRouter;
