import {
	USER_LOG_IN_ERROR,
	USER_LOG_IN,
	USER_CLEAR_ERROR, USER_LOG_IN_REQUEST, USER_LOG_OUT
} from './actions/constants';

const initialState = {
	name:           '',
	errorMessage:   '',
	isAuth:         false,
	loading:        false,
	isInitialized:  false,
};

const reducer = (state = initialState, { type, payload }) => {
	switch(type) {
		case USER_LOG_IN_REQUEST:
			return { ...state, loading: true };

		case USER_LOG_IN_ERROR:
			return { ...state, errorMessage: 'Неверный логин или пароль', loading: false };

		case USER_LOG_IN:
			return {
				...state,
				errorMessage: '',
				isAuth: true,
				name: payload.name,
				loading: false,
				isInitialized: true
			};

		case USER_LOG_OUT:
			return {
				...state,
				isAuth: false,
				name: '',
				isInitialized: true
			};

		case USER_CLEAR_ERROR:
			return { ...state, errorMessage: '' };

		default:
			return state;
	}
}

export default reducer;
