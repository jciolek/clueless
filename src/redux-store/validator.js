import pieces from '@/pieces/validator';
import players from '@/players/validator';
import { combineValidators } from './middleware/validator';

const validator = combineValidators(pieces, players);

export default validator;
