import * as React from 'react';

type Props = {
  name: string;
  onEdit?: () => void;
};

function ItemText({ name, onEdit }: Props): JSX.Element {
  return (
    <div className="grid-x grid-margin-x align-middle">
      <div className="cell auto">{name}</div>
      <div className="cell shrink">
        <button
          type="button"
          className="button margin-bottom-0"
          disabled={!onEdit}
          onClick={onEdit}
        >
          <i className="fa fa-pencil" />
        </button>
      </div>
    </div>
  );
}

export default ItemText;
