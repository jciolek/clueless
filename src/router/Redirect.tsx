import { isValidElement, useEffect } from 'react';
import { RedirectComponent, RedirectElement } from './types';
import useRouter from './useRouter';

const Redirect: RedirectComponent = ({ path }) => {
  const router = useRouter();

  useEffect(() => {
    router.history.replace(path);
  }, [path, router]);

  return null;
};

function isRedirectElement(node: React.ReactNode): node is RedirectElement {
  return isValidElement(node) && 'path' in node.props;
}

export default Redirect;
export { isRedirectElement };
