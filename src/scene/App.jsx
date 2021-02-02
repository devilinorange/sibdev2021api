import { useSelector }   from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Spin }          from 'antd';

import Header                     from '../components/Header';
import { PrivateRoute }           from '../components/utils';
import ROUTES                     from './routes';
import { isInitializedSelector }  from '../redux/user/selectors';

const App = () => {
  const isUserInitialized = useSelector(isInitializedSelector)

  const renderRoute = ({ path, component, isPrivate, needHeader, exact }) => {
    const Component = isPrivate ? PrivateRoute : Route;

    return (
      <Component key={path} path={path} exact={exact}>
        {needHeader && <Header />}
        {component}
      </Component>
    )
  }

  return isUserInitialized
    ? (
      <Switch>
        {ROUTES.map(renderRoute)}
      </Switch>
    )
    : (
      <div className='container flex-center'>
        <Spin />
      </div>
    );
}

export default App;
