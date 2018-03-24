import { combineValidators } from './middleware/validator';
import pieces from '../pieces/validator';

const validator = combineValidators(pieces);

export default validator;
