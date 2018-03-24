import { combineValidators } from './middleware/validator';
import pieces from '../pieces/validator';
import players from '../players/validator';

const validator = combineValidators(pieces, players);

export default validator;
