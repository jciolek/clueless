import * as React from 'react';
import { Link, useRouter } from '@/router';
import type { PathType } from '@/router/types';

type LabelType = string;
type StepType = {
  path: PathType;
  label: LabelType;
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

function Steps() {
  const { path } = useRouter();
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
