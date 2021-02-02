import { useCallback }          from 'react';
import { Link, useLocation }    from 'react-router-dom';
import { useDispatch }          from 'react-redux';
import { Button, Layout, Menu } from 'antd';

import { Logo }   from '../utils';
import { LINKS }  from '../../constants';
import { logOut } from '../../redux/user/actions';

const Header = () => {
	const location = useLocation();
	const dispatch = useDispatch();

	const handleLogout = useCallback(
		() => dispatch(logOut()),
		[ dispatch ]
	);

	return (
		<Layout.Header className='container bg-white border-bottom'>
			<div className='width100p flex-center'>
				<Logo width={48} height={48} />
				<Menu
					mode          = 'horizontal'
					selectedKeys  = {[ location.pathname ]}
					style         = {{ border: 'none', color: '#1890FF' }}
				>
					{LINKS.map(({ to, label }) => (
						<Menu.Item key={to}>
							<Link to={to}>{label}</Link>
						</Menu.Item>
					))}
				</Menu>
				<Button type='link' onClick={handleLogout} className='ml-auto'>Выйти</Button>
			</div>
		</Layout.Header>
	);
}

export default Header;
