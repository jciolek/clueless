import _ from 'lodash';

type Props = {
  name: string;
  groupId: string;
};

function Piece({ name, groupId }: Props) {
  return {
    id: `${groupId}.${_.camelCase(name)}`,
    name,
  };
}

export default Piece;
