// @flow
import * as React from 'react';
import ItemText from './item-text.component';
import ItemInput from './item-input.component';
import type { ItemIdType, ItemNameType } from './types';

type Props = {
  id?: ItemIdType,
  name?: ItemNameType,
  isEditMode?: boolean,
  onCancel?: () => void,
  onSave?: (?ItemIdType, ItemNameType) => void,
  onRemove?: (ItemIdType) => void,
};

type State = {
  isEditMode: boolean,
};

class Item extends React.Component<Props, State> {
  constructor(props) {
    const { isEditMode } = props;

    super(props);
    this.state = {
      isEditMode,
    };
  }

  handleEdit = () => {
    this.setState({ isEditMode: true });
  };

  handleCancel = () => {
    const { onCancel } = this.props;

    this.setState({ isEditMode: false });

    if (onCancel) {
      onCancel();
    }
  };

  handleSave = (name: ItemNameType) => {
    const { id, onSave } = this.props;

    this.setState({ isEditMode: false });
    if (onSave) {
      onSave(id, name);
    }
  };

  handleRemove = () => {
    const { id, onRemove } = this.props;

    if (onRemove && id !== undefined) {
      onRemove(id);
    }
  };

  render() {
    const { name, onRemove, onSave } = this.props;
    const { isEditMode } = this.state;
    const className = ['callout', 'small'];

    if (isEditMode) {
      className.push('primary');
    }

    return (
      <div className={className.join(' ')}>
        {isEditMode && (onSave || onRemove) ? (
          <ItemInput
            name={name}
            onCancel={this.handleCancel}
            onSave={onSave && this.handleSave}
            onRemove={onRemove && this.handleRemove}
          />
        ) : (
          <ItemText
            name={name}
            onEdit={(onSave || onRemove) && this.handleEdit}
          />
        )}
      </div>
    );
  }
}

Item.defaultProps = {
  id: undefined,
  name: '',
  isEditMode: false,
  onCancel: undefined,
  onSave: undefined,
  onRemove: undefined,
};

export default Item;
