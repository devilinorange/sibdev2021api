import PropTypes            from 'prop-types';
import { useSelector }      from "react-redux";
import { Route, Redirect }  from 'react-router-dom';

import { isAuthSelector }   from '../../redux/user/selectors';

const propTypes = {
	children: PropTypes.node.isRequired
};

const PrivateRoute = ({ children, ...props }) => {
	const isAuth = useSelector(isAuthSelector);

	return (
		<Route {...props}>
			{isAuth
				? children
				: <Redirect to={{ pathname: '/login', state: {referrer: props.path }}} />
			}
		</Route>
	);
};

PrivateRoute.propTypes = propTypes;

export default PrivateRoute;
