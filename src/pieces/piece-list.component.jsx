// @flow
import * as React from 'react';
import List from '../item-list/list.component';
import type { PieceType, IdType, NameType } from './piece';

type GroupIdType = string;
type GroupNameType = string;
type GroupType = {
  id: GroupIdType,
  name: GroupNameType,
  items: PieceType[]
};

type Props = {
  groups: GroupType[],
  onAdd: (GroupIdType, NameType) => void,
  onSave: (IdType, NameType) => void,
  onRemove: (IdType) => void
};

class PieceList extends React.Component<Props> {
  handleAdd = (name: NameType, groupId: GroupIdType) => {
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
