import { createActionMap } from '@/redux-store/utils';

const actionMap = createActionMap([
  'START',
  'UNDO',
  'FINISH',
  'TOGGLE_PLAYER',
  'TOGGLE_PIECE',
  'UNSELECT_ALL_PIECES',
]);

export default actionMap;
