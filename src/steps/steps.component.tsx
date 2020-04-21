import * as React from 'react';
import { Link } from '@/router';
import type { PathType, RouterType } from '@/router/types';

type LabelType = string;
type StepType = {
  path: PathType;
  label: LabelType;
};
type Props = {
  router: RouterType;
};

const stepList: StepType[] = [
  {
    path: '/pieces',
    label: 'Pieces',
  },
  {
    path: '/players',
    label: 'Players',
  },
  {
    path: '/game',
    label: 'Game',
  },
];

function Steps(props: Props) {
  const {
    router: { path },
  } = props;
  const menuItemNodes = stepList.map((step) => {
    const className = step.path === path ? 'is-active' : '';

    return (
      <li key={step.path} className={className}>
        <Link path={step.path}>{step.label}</Link>
      </li>
    );
  });

  return <ul className="menu">{menuItemNodes}</ul>;
}

export default Steps;
