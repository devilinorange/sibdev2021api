import { useDispatch, useSelector }   from 'react-redux';
import { useLocation, useHistory }    from 'react-router-dom';
import {
	Button,
	Form,
	Input,
	Row,
	Col,
	Alert
}                                     from 'antd';

import { logIn, clearError }            from '../../redux/user/actions';
import {errorSelector, loadingSelector} from '../../redux/user/selectors';
import { Logo }                         from '../utils';

const FORM_LAYOUT   = { labelCol: { span: 8 }, wrapperCol: { span: 24 } };
const BUTTON_LAYOUT = { wrapperCol: { offset: 8, span: 8 } };
const RULES         = [ { required: true, message: 'Это обязательное поле' } ];

const LoginForm = () => {
	const [ form ] = Form.useForm();

	const location      = useLocation();
	const history       = useHistory();
	const errorMessage  = useSelector(errorSelector);
	const loading       = useSelector(loadingSelector);
	const dispatch      = useDispatch();

	const onSubmit = ({ login, password }) => {
		dispatch(logIn(login, password, history, location));
	};

	const onChange = () => {
		if (!errorMessage) return;
		dispatch(clearError());
	};

	return (
		<div className='login-form'>
			<Row justify='center'>
				<Logo width={88} height={88} className='mb8' />
			</Row>

			<Row justify='center'>
				<h1 className='login-form__title'>Вход</h1>
			</Row>

			<Row justify='center'>
				<Col span={24}>

					<Form
						{...FORM_LAYOUT}
						layout          = 'vertical'
						form            = {form}
						onFinish        = {onSubmit}
						validateTrigger = {['onChange', 'onSubmit']}
						onValuesChange  = {onChange}
					>
						<Form.Item label='Логин' name='login' rules={RULES}>
							<Input placeholder='Введите логин' size='large'/>
						</Form.Item>

						<Form.Item label='Пароль' name='password' rules={RULES}>
							<Input.Password placeholder='Введите пароль' size='large'/>
						</Form.Item>

						<Form.Item {...BUTTON_LAYOUT}>
							<Button
								type      = 'primary'
								htmlType  = 'submit'
								loading   = {loading}
								block
							>
								Войти
							</Button>
						</Form.Item>

						{errorMessage && <Alert message={errorMessage} type='error' />}

					</Form>

				</Col>
			</Row>

		</div>
	);
}

export default LoginForm;