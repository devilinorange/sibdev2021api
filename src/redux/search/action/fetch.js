import axios from 'axios';

import {
	SEARCH_REQUEST,
	SEARCH_RECEIVE,
	SEARCH_ERROR
}                               from './constants';
import { API_KEY }              from '../../../RESTRICTED_COSNTANTS';
import { DEFAULT_MAX_RESULTS }  from '../../../constants';

const fetch = urlSearchString => dispatch => {
	dispatch({ type: SEARCH_REQUEST });

	// Генерируем URLSearchParams и устанавливаем в него ключ API_KEY
	const searchParamsObject = new URLSearchParams(urlSearchString);
	searchParamsObject.set('part', 'id');
	searchParamsObject.set('type', 'video');
	searchParamsObject.set('key', API_KEY);
	if (!searchParamsObject.has('maxResults')) searchParamsObject.set('maxResults', String(DEFAULT_MAX_RESULTS));


	axios.get('https://www.googleapis.com/youtube/v3/search', {
		params: searchParamsObject
	})
		.then(({ data: { items } }) => {
			return axios.get('https://www.googleapis.com/youtube/v3/videos', {
				params: {
					part: 'id, snippet, statistics',
					id:   items.map(({ id: { videoId } }) => videoId).join(','),
					key:  API_KEY
				}
			});
		})
		.then(({ data: { items } }) => dispatch({ type: SEARCH_RECEIVE, payload: { items } }))
		.catch(error => dispatch({ type: SEARCH_ERROR, payload: { error: `Произошла ошибка\n;${error}` } }));
};

export default fetch;
