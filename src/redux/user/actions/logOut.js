import { USER_LOG_OUT }     from './constants';
import { TOKKEN_FIELDNAME } from '../../../constants';

const logOut = () => {
	localStorage.removeItem(TOKKEN_FIELDNAME);

	return { type: USER_LOG_OUT };
}

export default logOut;
