// @flow
export type PathType = string;

export type RouteType = string;

export type RouterType = {
  onNavigate: (PathType) => void,
  path: PathType,
};
