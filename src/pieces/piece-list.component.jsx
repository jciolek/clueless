// @flow
import * as React from 'react';
import List from '../item-list/list.component';
import type { PieceIdType, PieceNameType } from './types/piece';
import type { PieceGroupType, PieceGroupIdType } from './types/piece-group';

type Props = {
  groups: PieceGroupType[],
  onAdd: (PieceGroupIdType, PieceNameType) => void,
  onSave: (PieceIdType, PieceNameType) => void,
  onRemove: (PieceIdType) => void
};

class PieceList extends React.Component<Props> {
  handleAdd = (name: PieceNameType, groupId: PieceGroupIdType) => {
    this.props.onAdd(groupId, name);
  };

  render() {
    const { onSave, onRemove, groups } = this.props;

    return groups.map((group) => (
      <List
        key={group.id}
        title={group.name}
        items={group.items}
        meta={group.id}
        onAdd={this.handleAdd}
        onSave={onSave}
        onRemove={onRemove}
      />
    ));
  }
}

export default PieceList;
