import * as React from 'react';
import List from '@/item-list/list.component';
import type { PieceGroupType } from './types';

type Props = {
  groups: PieceGroupType[];
  onAdd?: (pieceGroupId: string, name: string) => void;
  onSave?: (pieceId: string, name: string) => void;
  onRemove?: (pieceId: string) => void;
};

class PieceList extends React.Component<Props> {
  static defaultProps = {
    onAdd: undefined,
    onSave: undefined,
    onRemove: undefined,
  };

  handleAdd = (name: string, groupId: string) => {
    const { onAdd } = this.props;
    if (onAdd) {
      onAdd(groupId, name);
    }
  };

  render() {
    const { onSave, onRemove, onAdd, groups } = this.props;

    return groups.map((group) => (
      <List
        key={group.id}
        title={group.name}
        items={group.items}
        meta={group.id}
        onAdd={onAdd && this.handleAdd}
        onSave={onSave}
        onRemove={onRemove}
      />
    ));
  }
}

export default PieceList;
