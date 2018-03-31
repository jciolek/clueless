// @flow
import * as React from 'react';
import type { RouteType } from './types/route';

type Props = {
  route: RouteType,
  onNavigate: (RouteType) => void,
  className?: string,
  children: React.Node
};

class Link extends React.Component<Props> {
  handleClick = (evt: SyntheticEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    this.props.onNavigate(evt.currentTarget.pathname);
  };

  render() {
    const { className, children, route } = this.props;
    return (
      <a href={route} className={className} onClick={this.handleClick}>
        {children}
      </a>
    );
  }
}

export default Link;
