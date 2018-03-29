// @flow
import * as React from 'react';
import Item from './item.component';
import type { ItemType, IdType, NameType } from './item.type';

type Props = {
  title: string,
  items: Array<ItemType>,
  onAdd: (NameType) => void,
  onSave: (IdType, NameType) => void,
  onRemove?: (IdType) => void
};
type State = {
  isCreateMode: boolean
};

class List extends React.Component<Props, State> {
  state = {
    isCreateMode: false
  };

  handleSave = (id: ?IdType, name: NameType) => {
    if (id || id === 0) {
      this.props.onSave(id, name);
    } else {
      this.props.onAdd(name);
    }

    this.setState({ isCreateMode: false });
  };

  handleCreate = () => {
    this.setState({ isCreateMode: true });
  };

  handleCancel = () => {
    this.setState({ isCreateMode: false });
  };

  handleRemove = (id: IdType) => {
    const { onRemove } = this.props;

    if (onRemove) {
      onRemove(id);
    }
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
