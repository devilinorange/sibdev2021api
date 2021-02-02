import { FAVORITE_EDIT }        from './constants';
import { nameSelector }         from '../../user/selectors';
import { FAVORITES_FIELDNAME }  from '../../../constants';

const favoriteEdit = (name, newName, query, order, maxResults) => (dispatch, getState) => {
	const searchParams = new URLSearchParams();
	searchParams.append('q', query);
	searchParams.append('order', order);
	searchParams.append('maxResults', String(maxResults));
	const resultParams = searchParams.toString();

	// Меняем в localStorage
	const userName = nameSelector(getState());
	const storageData = JSON.parse(localStorage.getItem(FAVORITES_FIELDNAME)) || {};
	const usersFavorites = storageData[userName] || [];
	const index = usersFavorites.findIndex(({ name: lsName }) => lsName === name);
	localStorage.setItem(FAVORITES_FIELDNAME, JSON.stringify({
		...storageData,
		[userName]: [...usersFavorites.slice(0, index), { name: newName, query: resultParams }, ...usersFavorites.slice(index + 1)]
	}));

	dispatch({ type: FAVORITE_EDIT, payload: { name, newName, query: resultParams }});
};

export default favoriteEdit;
