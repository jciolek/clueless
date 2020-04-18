import Router from './router.component';
import Link from './link.component';
import Route from './route.component';
import Redirect from './redirect.component';
import Switch from './switch.component';
import { withRouter } from './router.context';
import useRouter from './useRouter';

const LinkWithRouter = withRouter(Link);
const RouteWithRouter = withRouter(Route);
const RedirectWithRouter = withRouter(Redirect);
const SwitchWithRouter = withRouter(Switch);

export {
  Router,
  LinkWithRouter as Link,
  RouteWithRouter as Route,
  SwitchWithRouter as Switch,
  RedirectWithRouter as Redirect,
  withRouter,
  useRouter,
};
