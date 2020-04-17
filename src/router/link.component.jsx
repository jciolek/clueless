// @flow
import * as React from 'react';
import type { PathType, RouterType } from './types';

type Props = {
  router: RouterType,
  path: PathType,
  onNavigate: (PathType) => void,
  className?: string,
  children: React.Node
};

class Link extends React.Component<Props> {
  handleClick = (evt: SyntheticEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    this.props.router.onNavigate(evt.currentTarget.pathname);
  };

  render() {
    const { className, children, path } = this.props;

    return (
      <a href={path} className={className} onClick={this.handleClick}>
        {children}
      </a>
    );
  }
}

export default Link;
