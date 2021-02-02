import { combineReducers } from 'redux';

import user       from './user/reducer';
import favorites  from './favorites/reducer';
import search     from './search/reducer';

export default combineReducers({
	user,
	favorites,
	search
});
