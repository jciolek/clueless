import { useDispatch, useSelector } from 'react-redux';
import List from '@/item-list/List';
import actions from '@/redux-store/actions';
import { StateType } from '@/redux-store/types';
import { useCallback } from 'react';

function PlayerList(): JSX.Element {
  const dispatch = useDispatch();
  const players = useSelector<StateType, StateType['players']>(
    (state) => state.players
  );
  const isStarted = useSelector<StateType, boolean>(
    (state) => state.game.isStarted
  );

  const handleSave = useCallback(
    (id, name) => {
      dispatch(actions.players.rename({ id, name }));
    },
    [dispatch]
  );

  const handleAdd = useCallback(
    (name: string) => {
      dispatch(actions.players.add({ name }));
    },
    [dispatch]
  );

  const handleRemove = useCallback(
    (id) => {
      dispatch(actions.players.remove({ id }));
    },
    [dispatch]
  );

  return (
    <List
      title="Players"
      items={players}
      onAdd={isStarted ? undefined : handleAdd}
      onSave={handleSave}
      onRemove={isStarted ? undefined : handleRemove}
    />
  );
}

export default PlayerList;
