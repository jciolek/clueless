import * as React from 'react';
import { RouterType } from './types';

const RouterContext = React.createContext<RouterType | undefined>(undefined);

export default RouterContext;
