// @flow
import * as React from 'react';
import type { NameType } from './item.type';

type Props = {
  name: NameType,
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
