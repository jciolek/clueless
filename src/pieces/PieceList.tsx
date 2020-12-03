import { useCallback } from 'react';
import List from '@/item-list/List';
import actions from '@/redux-store/actions';
import { useDispatch, useSelector } from 'react-redux';
import type { StateType } from '@/redux-store/types';
import type { PieceGroupIdType } from './types';

function PieceList(): JSX.Element {
  const dispatch = useDispatch();
  const groups = useSelector<StateType, StateType['pieces']>(
    (state) => state.pieces
  );
  const isStarted = useSelector<StateType, boolean>(
    (state) => state.game.isStarted
  );

  const handleAdd = useCallback(
    (name: string, groupId: PieceGroupIdType): void => {
      dispatch(actions.pieces.add({ groupId, name }));
    },
    [dispatch]
  );

  const handleSave = useCallback(
    (id, name) => {
      dispatch(actions.pieces.replace({ id, name }));
    },
    [dispatch]
  );

  const handleRemove = useCallback(
    (id) => {
      dispatch(actions.pieces.remove({ id }));
    },
    [dispatch]
  );

  return (
    <>
      {groups.map((group) => (
        <List
          key={group.id}
          title={group.name}
          items={group.items}
          meta={group.id}
          onAdd={isStarted ? undefined : handleAdd}
          onSave={isStarted ? undefined : handleSave}
          onRemove={isStarted ? undefined : handleRemove}
        />
      ))}
    </>
  );
}

export default PieceList;
