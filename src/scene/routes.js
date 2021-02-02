import { Login, Main, Favorites } from '../pages';

const ROUTES = [
	{
		path:       '/',
		component:  <Main />,
		isPrivate:  true,
		needHeader: true,
		exact:      true
	},
	{
		path: '/favorites',
		component: <Favorites />,
		isPrivate: true,
		needHeader: true
	},
	{
		path: '/login',
		component: <Login />
	}
];

export default ROUTES;
