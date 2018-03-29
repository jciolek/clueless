// @flow
import * as React from 'react';
import type { IdType, NameType } from './item.type';

type Props = {
  name: NameType,
  onSave: (name: NameType) => void,
  onCancel: () => void,
  onRemove?: (IdType) => void
};
type State = {
  name: NameType
};

class ItemInput extends React.Component<Props, State> {
  state = {
    name: this.props.name
  };

  handleChange = (evt: SyntheticEvent<HTMLInputElement>) => {
    this.setState({ name: evt.currentTarget.value });
  };

  handleSave = () => {
    this.props.onSave(this.state.name);
  };

  render() {
    const { onCancel, onRemove } = this.props;
    const { name } = this.state;

    return (
      <div className="input-group">
        {onRemove ? (
          <div className="input-group-button">
            <button className="alert button" onClick={onRemove}>
              <i className="fa fa-trash-o" />
            </button>
          </div>
        ) : null}
        <input
          type="text"
          className="input-group-field"
          value={name}
          onChange={this.handleChange}
        />
        <div className="input-group-button">
          <button className="hollow secondary button" onClick={onCancel}>
            <i className="fa fa-times" />
          </button>
        </div>
        <div className="input-group-button">
          <button className="button" onClick={this.handleSave}>
            <i className="fa fa-check" />
          </button>
        </div>
      </div>
    );
  }
}

export default ItemInput;
