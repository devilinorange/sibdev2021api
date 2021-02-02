import classnames from 'classnames';
import PropTypes  from 'prop-types';

const propTypes = {
	id:         PropTypes.string.isRequired,
	title:      PropTypes.string.isRequired,
	channel:    PropTypes.string.isRequired,
	viewsCount: PropTypes.string.isRequired,
	inline:     PropTypes.bool
};

const Video = ({ id, title, channel, viewsCount, inline }) => {
	return (
		<div
			className={classnames({
				'video':          true,
				'video--inline':  inline
			})}
		>
			<iframe
				width       = '340'
				height      = '200'
				src         = {`https://www.youtube.com/embed/${id}`}
				frameBorder = '1'
				allow       = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
				allowFullScreen
			/>
			<div className='video__description'>
				<p className='video__title'>{title}</p>
				<p className='video__channel'>{channel}</p>
				<p className='video__views'>{Number(viewsCount).toLocaleString()} просмотров</p>
			</div>
		</div>
	);
};

Video.propTypes = propTypes;

export default Video;
