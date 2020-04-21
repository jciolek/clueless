export type PathType = string;

export type RouteType = string;

export type RouterType = {
  onNavigate: (path: PathType) => void;
  path: PathType;
};
