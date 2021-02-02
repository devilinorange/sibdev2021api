import { FAVORITE_INITIALIZE } from './constants';
import { FAVORITES_FIELDNAME } from '../../../constants';

const initializeFavorites = userName => dispatch => {
	const favorites = JSON.parse(localStorage.getItem(FAVORITES_FIELDNAME)) || {};
	const userFavorites = favorites[userName];

	if (!userFavorites) return;

	dispatch({ type: FAVORITE_INITIALIZE, payload: { favorites: userFavorites } });
};

export default initializeFavorites;
