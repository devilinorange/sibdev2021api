import { FAVORITE_REMOVE }    from './constants';
import {nameSelector}         from '../../user/selectors';
import {FAVORITES_FIELDNAME}  from '../../../constants';

const removeFavorite = name => (dispatch, getState) => {
	// Удаляем из localStorage
	const userName = nameSelector(getState());
	const storageData = JSON.parse(localStorage.getItem(FAVORITES_FIELDNAME)) || {};
	const usersFavorites = storageData[userName] || [];
	localStorage.setItem(FAVORITES_FIELDNAME, JSON.stringify({
		...storageData,
		[userName]: usersFavorites.filter(({ name: lsName }) => lsName !== name)
	}));

	dispatch({ type: FAVORITE_REMOVE, payload: { name } });
}

export default removeFavorite;
