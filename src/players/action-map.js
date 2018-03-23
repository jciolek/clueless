import { createActionMap } from '../redux-store/utils';

const actionMap = createActionMap([
  { ADD: [undefined, () => ({ autoid: true })] },
  'REMOVE',
  'RENAME',
  'UPDATE'
]);

export default actionMap;
