import nJwt   from 'njwt';

import users                    from '../../../users.json';
import { initializeFavorites }  from '../../favorites/actions';
import {
	SIGN_KEY,
	TOKKEN_FIELDNAME
}             from '../../../constants';
import {
	USER_LOG_IN,
	USER_LOG_IN_ERROR,
	USER_LOG_IN_REQUEST
}             from './constants';

const logIn = (login, password, history, location) => dispatch => {
	dispatch({ type: USER_LOG_IN_REQUEST });

	const user = users.find(({ login: log, password: pass }) => login === log && password === pass);

	if (!user) return dispatch({ type: USER_LOG_IN_ERROR });

	// Генерируем токкен
	const jwt = nJwt.create({ user: user.name }, SIGN_KEY).setExpiration().compact();
	localStorage.setItem(TOKKEN_FIELDNAME, jwt);

	dispatch(initializeFavorites(user.name));
	dispatch({ type: USER_LOG_IN, payload: { name: user.name } });

	history.push(location.state.referrer || '/');
};

export default logIn;
