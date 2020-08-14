function matchRoute(route: string, path: string) {
  return !route || route === path;
}

/* eslint-disable import/prefer-default-export */
export { matchRoute };
