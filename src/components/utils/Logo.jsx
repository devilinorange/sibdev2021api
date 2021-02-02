import {Image} from 'antd';

import SibdevLogo from '../../assets/images/sibdev-logo.svg';

const Logo = props => (
	<Image
		{...props}
		src       = {SibdevLogo}
		preview   = {false}
	/>
);

export default Logo;
