import * as React from 'react';
import { useCallback } from 'react';
import type { PathType } from './types';
import useRouter from './useRouter';

type Props = {
  path: PathType;
  className?: string;
  children: React.ReactNode;
};

function Link({ className, path, children }: Props) {
  const router = useRouter();
  const handleClick = useCallback(
    (evt: React.SyntheticEvent<HTMLAnchorElement>) => {
      evt.preventDefault();
      router.history.push(evt.currentTarget.pathname);
    },
    [router]
  );

  return (
    <a href={path} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}

export default Link;
