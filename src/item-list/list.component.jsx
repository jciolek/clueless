// @flow
import * as React from 'react';
import Item from './item.component';
import type { ItemType, ItemIdType, ItemNameType } from './types';

type MetaType = any;
type Props = {
  title: string,
  items: ItemType[],
  onAdd?: (ItemNameType, MetaType) => void,
  onSave?: (ItemIdType, ItemNameType, MetaType) => void,
  onRemove?: (ItemIdType, MetaType) => void,
  meta?: MetaType
};
type State = {
  isCreateMode: boolean
};

class List extends React.Component<Props, State> {
  state = {
    isCreateMode: false
  };

  handleCreate = () => {
    this.setState({ isCreateMode: true });
  };

  handleSave = (id: ?ItemIdType, name: ItemNameType) => {
    const { meta, onSave, onAdd } = this.props;

    this.setState({ isCreateMode: false });

    if (id === undefined && onAdd) {
      onAdd(name, meta);
    }

    if (id !== null && id !== undefined && onSave) {
      onSave(id, name, meta);
    }
  };

  handleRemove = (id: ItemIdType) => {
    const { onRemove, meta } = this.props;

    if (onRemove) {
      onRemove(id, meta);
    }
  };

  handleCancel = () => {
    this.setState({ isCreateMode: false });
  };

  render() {
    const { title, items, onRemove, onAdd, onSave } = this.props;
    const { isCreateMode } = this.state;
    const itemNodes = items.map((item) => (
      <Item
        key={item.id}
        id={item.id}
        name={item.name}
        onSave={onSave && this.handleSave}
        onRemove={onRemove && !item.isProtected ? this.handleRemove : undefined}
      />
    ));
    const newItemNode = isCreateMode ? (
      <Item onSave={this.handleSave} onCancel={this.handleCancel} isEditMode />
    ) : null;
    const addItemButton =
      !isCreateMode && onAdd ? (
        <button
          className="clear small secondary button margin-bottom-0"
          onClick={this.handleCreate}
        >
          <i className="fa fa-2x fa-plus-circle" />
        </button>
      ) : null;

    return (
      <div>
        <h2>
          {title} {addItemButton}
        </h2>
        {newItemNode}
        {itemNodes}
      </div>
    );
  }
}

export default List;
