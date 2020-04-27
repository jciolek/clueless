import React, { useMemo, useEffect, useState } from 'react';
import { createBrowserHistory } from 'history';
import RouterContext from './RouterContext';

type Props = {
  children: React.ReactNode;
};

function Router({ children }: Props) {
  const [history] = useState(createBrowserHistory());
  const [location, setLocation] = useState(history.location);
  // We need to add listener here and not in the useEffect hook,
  // because there may be a redirect on the first render
  // and we would miss it otherwise.
  const [unlisten] = useState(() =>
    history.listen((newLocation) => {
      setLocation(newLocation);
    })
  );

  const router = useMemo(
    () => ({
      history,
      location,
    }),
    [history, location]
  );

  useEffect(() => unlisten, [unlisten]);

  return (
    <RouterContext.Provider value={router}>{children}</RouterContext.Provider>
  );
}

export default Router;
