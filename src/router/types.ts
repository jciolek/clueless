import { History, Location } from 'history';

export type PathType = string;

export type RouteType = string;

export type RouterType = {
  history: History;
  location: Location;
};

// Route types
export type RouteProps = React.PropsWithChildren<{
  route: RouteType;
}>;
export type RouteComponent = (props: RouteProps) => JSX.Element | null;
export type RouteElement = React.ReactElement<RouteProps, RouteComponent>;

// Redirect types
export type RedirectProps = {
  path: PathType;
};
export type RedirectComponent = (props: RedirectProps) => null;
export type RedirectElement = React.ReactElement<
  RedirectProps,
  RedirectComponent
>;

// Switch types
export type SwitchChild = RouteElement | RedirectElement;
