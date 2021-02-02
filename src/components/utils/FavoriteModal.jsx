import { useState, useCallback, useMemo }   from 'react';
import PropTypes                            from 'prop-types';
import { useDispatch, useSelector }         from 'react-redux';
import {
	Modal,
	Form,
	Input,
	InputNumber,
	Select,
	Slider,
	Row,
	Col,
	notification
} from 'antd';

import { SORT_OPTIONS, DEFAULT_MAX_RESULTS }  from '../../constants';
import { addFavorite, editFavorite }          from '../../redux/favorites/actions';
import { favoritesSelector }                  from '../../redux/favorites/selectors';

const propTypes = {
	searchParams: PropTypes.string.isRequired,      // URLSearchParams String
	isVisible:    PropTypes.bool.isRequired,
	onClose:      PropTypes.func.isRequired,
	name:         PropTypes.string,
};

const FavoriteModal = ({ name, searchParams, isVisible, onClose }) => {
	const [ maxResults, setMaxResults ] = useState(
		() => new URLSearchParams(searchParams).get('maxResults') || DEFAULT_MAX_RESULTS
	);

	const urlSearchParams = useMemo(
		() => new URLSearchParams(searchParams),
		[ searchParams ]
	);

	const favorites = useSelector(favoritesSelector);

	const initialValues = useMemo(
		() => ({
			query: urlSearchParams.get('q') || '',
			order: urlSearchParams.get('order') || 'relevance',
			name: name || ''
		}),
		[ urlSearchParams, name ]
	);

	const handleChangeMaxResults = useCallback(
		value => setMaxResults(value),
		[ setMaxResults ]
	);

	const [ form ] = Form.useForm();
	const dispatch = useDispatch();

	const handleSubmitClick = () => {
		form.validateFields()
			.then(() => {
				const { query, order, name: newName } = form.getFieldsValue(true);
				if (!name && !!favorites.find(({ name: storeName }) => storeName === newName)) {
					notification.error({
						message: 'Запрос с таким именем уже существует',
						duration: 8
					});

					return;
				}

				dispatch(name
					? editFavorite(name, newName, query, order, maxResults)
					: addFavorite(newName, query, order, maxResults)
				);

				onClose();
			});
	};

	return (
		<Modal
			visible   = {isVisible}
			onCancel  = {onClose}
			onOk      = {handleSubmitClick}
			destroyOnClose
		>
			<h4 className='font-size-18 text-align-center'>{name ? 'Изменить запрос' : 'Сохранить запрос'}</h4>
			<Form
				labelCol        = {{ span: 8 }}
				wrapperCol      = {{ span: 24 }}
				layout          = 'vertical'
				form            = {form}
				onFinish        = {handleSubmitClick}
				initialValues   = {initialValues}
				preserve        = {false}
			>
				<Form.Item label='Запрос' name='query'>
					<Input placeholder='Что нужно найти?' size='large'/>
				</Form.Item>
				<Form.Item
					label = 'Название'
					name  = 'name'
					rules = {[{ required: true, message: 'Это обязательное поле' }]}
				>
					<Input placeholder='Укажите название' size='large'/>
				</Form.Item>
				<Form.Item label='Сортировать' name='order'>
					<Select size='large'>
						{SORT_OPTIONS.map(({ value, label }) => (
							<Select.Option key={value} value={value}>
								{label}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
				<Row>Максимальное количество</Row>
				<Row>
					<Col span={18}>
						<Slider
							min       = {0}
							max       = {50}
							onChange  = {handleChangeMaxResults}
							value     = {maxResults}
						/>
					</Col>
					<Col span={6}>
						<InputNumber
							min       = {0}
							max       = {50}
							style     = {{ margin: '0 16px' }}
							value     = {maxResults}
							onChange  = {handleChangeMaxResults}
						/>
					</Col>
				</Row>
			</Form>
		</Modal>
	);
};

FavoriteModal.propTypes = propTypes;

export default FavoriteModal;
