import {
	FAVORITE_ADD,
	FAVORITE_REMOVE,
	FAVORITE_INITIALIZE,
	FAVORITE_EDIT
} from './actions/constants';

import {
	USER_LOG_OUT
} from '../user/actions/constants';

const reducer = (state=[], { type, payload }) => {
	switch (type) {
		case FAVORITE_ADD:
			return [...state, { name: payload.name, query: payload.query }];

		case FAVORITE_REMOVE:
			return state.filter(({ name }) => name !== payload.name);

		case FAVORITE_EDIT:
			const index = state.findIndex(({ name: storeName }) => storeName === payload.name);
			return [...state.slice(0, index), { name: payload.newName, query: payload.query }, ...state.slice(index + 1)]

		case FAVORITE_INITIALIZE:
			return [ ...payload.favorites ];

		case USER_LOG_OUT:
			return [];

		default:
			return state;
	}
}

export default reducer;
