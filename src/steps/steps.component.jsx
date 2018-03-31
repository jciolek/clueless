// @flow
import * as React from 'react';
import LinkContainer from '../router/link.container';
import type { RouteType } from '../router/types/route';

type LabelType = string;
type StepType = {
  route: RouteType,
  label: LabelType
};
type Props = {
  activeRoute: RouteType
};

const stepList: StepType[] = [
  {
    route: '/pieces',
    label: 'Pieces'
  },
  {
    route: '/players',
    label: 'Players'
  },
  {
    route: '/game',
    label: 'Game'
  }
];

function Steps(props: Props) {
  const { activeRoute } = props;
  const menuItemNodes = stepList.map((step) => {
    const className = step.route === activeRoute ? 'is-active' : '';

    return (
      <li className={className}>
        <LinkContainer route={step.route}>{step.label}</LinkContainer>
      </li>
    );
  });

  return <ul className="menu">{menuItemNodes}</ul>;
}

export default Steps;
