import { createActionMap } from '../redux-store/utils';

const actionMap = createActionMap([
  { ADD: [undefined, () => ({ autoid: true })] },
  'REMOVE',
  'UPDATE'
]);

export default actionMap;
