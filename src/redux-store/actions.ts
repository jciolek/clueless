import { actions as pieces } from '@/pieces/slice';
import { actions as game } from '@/game/slice';
import { actions as players } from '@/players/slice';
import { actions as questions } from '@/questions/slice';
import { createAction } from '@reduxjs/toolkit';

const actions = {
  game,
  pieces,
  players,
  questions,
  undoable: {
    undo: createAction('undoable/undo'),
    redo: createAction('undoable/redo'),
  },
};

export default actions;
