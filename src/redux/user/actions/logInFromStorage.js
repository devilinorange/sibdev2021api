import nJwt from 'njwt';

import { USER_LOG_IN, USER_LOG_OUT }  from './constants';
import { SIGN_KEY, TOKKEN_FIELDNAME } from '../../../constants';
import { initializeFavorites }        from '../../favorites/actions';

const logInFromStorage = () => dispatch => {
	const jwt = localStorage.getItem(TOKKEN_FIELDNAME);
	if (!jwt) return dispatch({ type: USER_LOG_OUT });

	nJwt.verify(jwt, SIGN_KEY, (err, { body: { user: name } }) => {
		if (err) {
			localStorage.removeItem(TOKKEN_FIELDNAME);
			dispatch({ type: USER_LOG_OUT });
		} else {
			dispatch(initializeFavorites(name));
			dispatch({ type: USER_LOG_IN, payload: { name } });
		}
	});
};

export default logInFromStorage;
