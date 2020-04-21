import * as React from 'react';
import type { PathType, RouterType } from './types';

type Props = {
  router: RouterType;
  path: PathType;
  onNavigate: (path: PathType) => void;
  className?: string;
  children: React.ReactNode;
};

class Link extends React.Component<Props> {
  static defaultProps = {
    className: undefined,
  };

  handleClick = (evt: React.SyntheticEvent<HTMLAnchorElement>) => {
    const {
      router: { onNavigate },
    } = this.props;

    evt.preventDefault();
    onNavigate(evt.currentTarget.pathname);
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
