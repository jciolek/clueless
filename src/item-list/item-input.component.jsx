// @flow
import * as React from 'react';
import type { ItemIdType, ItemNameType } from './types';

type Props = {
  name: ItemNameType,
  onCancel: () => void,
  onSave: ?(name: ItemNameType) => void,
  onRemove: ?(ItemIdType) => void,
};
type State = {
  name: ItemNameType,
  isSaveEnabled: boolean,
};

class ItemInput extends React.Component<Props, State> {
  constructor(props) {
    const { name } = props;

    super(props);
    this.state = {
      name,
      isSaveEnabled: !!name,
    };
  }

  handleChange = (evt: SyntheticEvent<HTMLInputElement>) => {
    const name = evt.currentTarget.value;
    this.setState({ name, isSaveEnabled: !!name });
  };

  handleSave = () => {
    const { onSave } = this.props;
    const { name, isSaveEnabled } = this.state;

    if (isSaveEnabled && onSave) {
      onSave(name);
    }
  };

  render() {
    const { onCancel, onRemove, onSave } = this.props;
    const { name, isSaveEnabled } = this.state;

    return (
      <div className="input-group">
        {onRemove && (
          <div className="input-group-button">
            <button type="button" className="alert button" onClick={onRemove}>
              <i className="fa fa-trash-o" />
            </button>
          </div>
        )}
        <input
          type="text"
          className="input-group-field"
          value={name}
          onChange={this.handleChange}
        />
        <div className="input-group-button">
          <button
            type="button"
            className="hollow secondary button"
            onClick={onCancel}
          >
            <i className="fa fa-times" />
          </button>
        </div>
        {onSave && (
          <div className="input-group-button">
            <button
              type="button"
              className="button"
              disabled={!isSaveEnabled}
              onClick={this.handleSave}
            >
              <i className="fa fa-check" />
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default ItemInput;
