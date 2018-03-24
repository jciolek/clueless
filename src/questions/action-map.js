import { createActionMap } from '../redux-store/utils';

const actionMap = createActionMap([
  { ADD: [undefined, (payload, meta) => ({ autoid: true, ...meta })] },
  'REMOVE',
  'UPDATE'
]);

export default actionMap;
