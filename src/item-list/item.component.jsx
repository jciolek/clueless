// @flow
import * as React from 'react';
import ItemText from './item-text.component';
import ItemInput from './item-input.component';
import type { ItemIdType, ItemNameType } from './types/item';

type Props = {
  id?: ItemIdType,
  name: ItemNameType,
  isEditMode: boolean,
  onSave: (?ItemIdType, ItemNameType) => void,
  onCancel: () => void,
  onRemove?: (ItemIdType) => void
};

type State = {
  isEditMode: boolean
};

class Item extends React.Component<Props, State> {
  static defaultProps = {
    name: '',
    isEditMode: false,
    onCancel: () => {}
  };

  state = {
    isEditMode: this.props.isEditMode
  };

  handleEdit = () => {
    this.setState({ isEditMode: true });
  };

  handleCancel = () => {
    const { onCancel } = this.props;

    this.setState({ isEditMode: false });
    onCancel();
  };

  handleSave = (name: ItemNameType) => {
    const { id, onSave } = this.props;

    this.setState({ isEditMode: false });
    onSave(id, name);
  };

  handleRemove = () => {
    const { id, onRemove } = this.props;

    if (onRemove && id !== undefined) {
      onRemove(id);
    }
  };

  render() {
    const { name, onRemove } = this.props;
    const { isEditMode } = this.state;
    const className = ['callout', 'small'];

    if (isEditMode) {
      className.push('primary');
    }

    return (
      <div className={className.join(' ')}>
        {isEditMode ? (
          <ItemInput
            name={name}
            onCancel={this.handleCancel}
            onSave={this.handleSave}
            onRemove={onRemove ? this.handleRemove : undefined}
          />
        ) : (
          <ItemText name={name} onEdit={this.handleEdit} />
        )}
      </div>
    );
  }
}

export default Item;
