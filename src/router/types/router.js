// @flow
import type { PathType } from './path';

export type RouterType = {
  onNavigate: (PathType) => void,
  path: PathType
};
