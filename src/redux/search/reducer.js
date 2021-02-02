import {
	SEARCH_REQUEST,
	SEARCH_RECEIVE,
	SEARCH_ERROR
} from './action/constants';

const initialValue = {
	loading:      false,
	errorMessage: '',
	items:        []
};

const reducer = (state = initialValue, { type, payload }) => {
	switch (type) {
		case SEARCH_REQUEST:
			return { ...state, loading: true, items: [], errorMessage: '' };

		case SEARCH_RECEIVE:
			return { ...state, loading: false, items: payload.items };

		case SEARCH_ERROR:
			return { ...state, loading: false, errorMessage: payload.error };

		default:
			return state;
	}
};

export default reducer;
