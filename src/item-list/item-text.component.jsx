// @flow
import * as React from 'react';
import type { ItemNameType } from './types/item';

type Props = {
  name: ItemNameType,
  onEdit: () => void
};

function ItemText({ name, onEdit }: Props) {
  return (
    <div className="grid-x grid-margin-x align-middle">
      <div className="cell auto">{name}</div>
      <div className="cell shrink">
        <button className="button margin-bottom-0" onClick={onEdit}>
          <i className="fa fa-pencil" />
        </button>
      </div>
    </div>
  );
}

export default ItemText;
