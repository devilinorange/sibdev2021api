import { useMemo, useState }  from 'react';
import { Row, Col, Space }    from 'antd';
import classnames             from 'classnames';
import { useLocation }        from 'react-router-dom';
import { useSelector }        from 'react-redux';
import {
	AppstoreOutlined,
	MenuOutlined
}                             from '@ant-design/icons';

import { videosSelector }     from '../../redux/search/selectors';
import Video                  from './Video';

const VIEWS = { table: 'table', list: 'list' };

const SearchResults = () => {
	const [ view, setView ] = useState(VIEWS.table);

	const { search }  = useLocation();
	const videos      = useSelector(videosSelector);

	const query = useMemo(
		() => {
			const searchUrl = new URLSearchParams(search);
			return searchUrl.get('q') || '';
		},
		[ search ]
	);

	const handleChangeView = view => () => setView(view);

	return (
		<div className='width100p flex-column pt40 font-size-18'>
			<Row>
				<Col className='mb16'>
					Видео по запросу &nbsp;
					<strong>{query}</strong>
				</Col>
				<div className='ml-auto'>
					<Space size='middle'>
						<MenuOutlined
							onClick   = {handleChangeView(VIEWS.list)}
							className = {classnames({
								'clickable-icon': true,
								'clickable-icon--active': view === VIEWS.list
							})}
						/>
						<AppstoreOutlined
							onClick   = {handleChangeView(VIEWS.table)}
							className = {classnames({
								'clickable-icon': true,
								'clickable-icon--active': view === VIEWS.table
							})}
						/>
					</Space>
				</div>
			</Row>
			<Row>
				<Space size='large' direction={view === VIEWS.list ? 'vertical' : 'horizontal'} wrap>
					{videos.map(({ id, snippet: { title, channelTitle }, statistics: { viewCount } }) => (
						<Video
							key         = {id}
							id          = {id}
							title       = {title}
							channel     = {channelTitle}
							viewsCount  = {viewCount}
							inline      = {view === VIEWS.list}
						/>
					))}
				</Space>
			</Row>
		</div>
	);
}

export default SearchResults;
