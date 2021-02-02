import { notification }         from 'antd';

import { FAVORITE_ADD }         from './constants';
import { FAVORITES_FIELDNAME }  from '../../../constants';
import { nameSelector }         from '../../user/selectors';

const addFavorite = (name, query, order, maxResults) => (dispatch, getState) => {
	const searchParams = new URLSearchParams();
	searchParams.append('q', query);
	searchParams.append('order', order);
	searchParams.append('maxResults', String(maxResults));
	const resultParams = searchParams.toString();

	// Добавляем в localStorage
	const userName = nameSelector(getState());
	const storageData = JSON.parse(localStorage.getItem(FAVORITES_FIELDNAME)) || {};
	const usersFavorites = storageData[userName] || [];
	localStorage.setItem(FAVORITES_FIELDNAME, JSON.stringify({
		...storageData,
		[userName]: [ ...usersFavorites, { name, query: resultParams } ]
	}));

	dispatch({ type: FAVORITE_ADD, payload: { name, query: resultParams.toString() } });

	notification.success({
		message: 'Запрос добавлен в избранное',
		duration: 3
	});
}

export default addFavorite;
