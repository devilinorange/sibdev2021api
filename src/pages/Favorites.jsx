import { Layout, Space, Empty }   from 'antd';
import { useSelector }            from 'react-redux';
import { useState, useCallback }  from 'react';

import { favoritesSelector }  from '../redux/favorites/selectors';
import { FavoriteCard }       from '../components/Favorites';
import { FavoriteModal }      from '../components/utils';

const Favorites = () => {
	const [ selectedItem, setSelectedItem ] = useState(null);

	const favorites = useSelector(favoritesSelector);

	const handleCloseModal = useCallback(
		() => setSelectedItem(null),
		[ setSelectedItem ]
	);

	const handleOpenModal = (name, query) => () => setSelectedItem({ name, query });

	return (
		<Layout.Content className='container min-height-100vh py40'>
			<h1>Избранное</h1>
			{!favorites.length && (
				<Empty description='Избранные отсутствуют' />
			)}
			<Space className='width100p' direction='vertical'>
				{favorites.map(({ name, query }) => (
					<FavoriteCard
						key           = {name}
						name          = {name}
						query         = {query}
						onEditClick   = {handleOpenModal(name, query)}
					/>
				))}
			</Space>
			{
				// Открываем модалку таким образом, для того чтобы она маунтилась только при наличии выбранного шаблона
				!!selectedItem && (
					<FavoriteModal
						name          = {selectedItem?.name}
						searchParams  = {selectedItem?.query}
						onClose       = {handleCloseModal}
						isVisible
					/>
				)
			}
		</Layout.Content>
	);
};

export default Favorites;
