// @flow
import * as React from 'react';
import Item from './item.component';
import type { ItemType, ItemIdType, ItemNameType } from './types/item';

type MetaType = any;
type Props = {
  title: string,
  items: ItemType[],
  onAdd: (ItemNameType, MetaType) => void,
  onSave: (ItemIdType, ItemNameType, MetaType) => void,
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
    const { meta } = this.props;

    if (id || id === 0) {
      this.props.onSave(id, name, meta);
    } else {
      this.props.onAdd(name, meta);
    }

    this.setState({ isCreateMode: false });
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
    const { title, items } = this.props;
    const { isCreateMode } = this.state;
    const itemNodes = items.map((item) => (
      <Item
        key={item.id}
        id={item.id}
        name={item.name}
        onSave={this.handleSave}
        onRemove={item.isProtected ? undefined : this.handleRemove}
      />
    ));
    const newItemNode = isCreateMode ? (
      <Item onSave={this.handleSave} onCancel={this.handleCancel} isEditMode />
    ) : null;
    const addItemButton = !isCreateMode ? (
      <button
        className="clear small secondary button"
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
