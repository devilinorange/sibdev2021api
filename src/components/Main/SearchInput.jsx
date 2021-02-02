import { useCallback, useState }   from 'react';
import { Row, Col, Input }         from 'antd';
import { useLocation, useHistory } from 'react-router-dom';
import classnames                  from 'classnames';
import { HeartOutlined }           from '@ant-design/icons';

import { FavoriteModal }                from '../utils';

const SearchInput = () => {
	const [ isModalOpen, setIsModalOpen ] = useState(false);

	const { search } = useLocation();
	const history = useHistory();

	const [ query, setQuery ] = useState('');

	const offset  = !search ? 8 : 0;
	const span    = !search ? 8 : 24;

	const handleModalOpen = useCallback(
		() => setIsModalOpen(true),
		[ setIsModalOpen ]
	);

	const handleModalClose = useCallback(
		() => setIsModalOpen(false),
		[ setIsModalOpen ]
	);

	const handleSearch = useCallback(
		value => {
			const searchParams = new URLSearchParams();
			searchParams.set('q', value);

			history.push(`/?${searchParams.toString()}`)
		},
		[ history ]
	);

	const handleQueryChange = useCallback(
		e => setQuery(e.target.value),
		[ setQuery ]
	);

	const suffix = (
		<HeartOutlined
			onClick   = {handleModalOpen}
			className = {classnames({
				'fav-icon': true,
				'display-none': !search
			})}
		/>
	);

	return (
		<div className='width100p'>
			<Row>
				<Col offset={offset} span={span}>
					<h1
						className={classnames({
							'text-align-left':    !!search,
							'text-align-center':  !search
						})}
					>
						Поиск видео
					</h1>
				</Col>
			</Row>
			<Row>
				<Col offset={offset} span={span}>
					<Input.Search
						placeholder   = 'Что хотите посмотреть?'
						size          = 'large'
						enterButton   = 'Найти'
						suffix        = {suffix}
						value         = {query}
						onChange      = {handleQueryChange}
						onSearch      = {handleSearch}
					/>
				</Col>
			</Row>
			{
				// Открываем модалку таким образом, чтобы она маунтилась только в определенный момент
				isModalOpen && (
					<FavoriteModal
						searchParams  = {`?q=${query}`}
						onClose       = {handleModalClose}
						isVisible
					/>
				)
			}
		</div>
	);
};

export default SearchInput;
