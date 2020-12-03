import * as React from 'react';
import ItemText from './ItemText';
import ItemInput from './ItemInput';

type Props = {
  id?: string;
  name: string;
  isEditMode?: boolean;
  onCancel?: () => void;
  onSave?: (id: string | undefined, name: string) => void;
  onRemove?: (id: string) => void;
};

type State = {
  isEditMode: boolean;
};

class Item extends React.Component<Props, State> {
  static defaultProps = {
    id: undefined,
    name: '',
    isEditMode: false,
    onCancel: undefined,
    onSave: undefined,
    onRemove: undefined,
  };

  constructor(props: Props) {
    super(props);

    const { isEditMode = false } = props;

    this.state = {
      isEditMode,
    };
  }

  handleEdit = (): void => {
    this.setState({ isEditMode: true });
  };

  handleCancel = (): void => {
    const { onCancel } = this.props;

    this.setState({ isEditMode: false });

    if (onCancel) {
      onCancel();
    }
  };

  handleSave = (name: string): void => {
    const { id, onSave } = this.props;

    this.setState({ isEditMode: false });
    if (onSave) {
      onSave(id, name);
    }
  };

  handleRemove = (): void => {
    const { id, onRemove } = this.props;

    if (onRemove && id !== undefined) {
      onRemove(id);
    }
  };

  render(): JSX.Element {
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

export default Item;
