import { useEffect }                  from 'react';
import { Layout, Spin, notification } from 'antd';
import { useLocation, useHistory }    from 'react-router-dom';
import classnames                     from 'classnames';
import { useDispatch, useSelector }   from 'react-redux';

import { fetch }                      from '../redux/search/action';
import { SearchInput, SearchResults } from '../components/Main';
import {
	loadingSelector,
	errorSelector
}                                     from '../redux/search/selectors';

const Main = () => {
	const { search } = useLocation();
	const history = useHistory();
	const dispatch = useDispatch();
	const isLoading = useSelector(loadingSelector);
	const error = useSelector(errorSelector);

	useEffect(
		() => {
			if (!search) return;

			dispatch(fetch(search));
		},
		[ search, dispatch ]
	);

	useEffect(
		() => {
			if (!error) return;

			notification.open({
				message: 'Что то пошло не так',
				description: error,
				duration: 0
			});

			history.push('/');
		},
		[ error, history ]
	);

	return (
		<Layout.Content
			className={classnames({
				'container':          true,
				'min-height-100vh':   true,
				'py40':               true,
				'flex-center':        !search,
				'flex-column-center': !!search
			})}
		>
			<SearchInput  />
			{isLoading && <Spin className='flex-center' style={{ minHeight: '50vh' }} />}
			{!isLoading && !!search && <SearchResults />}
		</Layout.Content>
	);
};

export default Main;