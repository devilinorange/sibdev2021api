import { Row, Col, Space }  from 'antd';
import { useCallback }      from 'react';
import { useDispatch }      from 'react-redux';
import { useHistory }       from 'react-router-dom';
import PropTypes            from 'prop-types';

import { removeFavorite }   from '../../redux/favorites/actions';

const propTypes = {
	name:           PropTypes.string.isRequired,
	query:          PropTypes.string.isRequired,
	onEditClick:    PropTypes.func.isRequired
};

const FavoriteCard = ({ name, query, onEditClick }) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const handleEditClick = useCallback(
		e => {
			e.stopPropagation();
			onEditClick(query)
		},
		[ onEditClick, query ]
	);

	const handleRemoveClick = useCallback(
		e => {
			e.stopPropagation();
			dispatch(removeFavorite(name))
		},
		[ dispatch, name ]
	);

	const handleSearchClick = useCallback(
		() => history.push(`/?${query}`),
		[ history, query ]
	);


	return (
		<Row className='favorite-card' onClick={handleSearchClick}>
			<Col span={24} className='favorite-card__container'>
				<p className='mb0 font-size-18'>{name}</p>
				<div className='favorite-card__options'>
					<Space>
						<span
							className = 'cursor-pointer text-blue hover-underline'
							onClick   = {handleEditClick}
						>
							Изменить
						</span>
						<span
							className = 'cursor-pointer text-red hover-underline'
							onClick   = {handleRemoveClick}
						>
							Удалить
						</span>
					</Space>
				</div>
			</Col>
		</Row>
	)
};

FavoriteCard.propTypes = propTypes;

export default FavoriteCard;


