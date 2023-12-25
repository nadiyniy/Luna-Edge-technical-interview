import CloseIcon from '../../assets/icons/x-mark.svg';
import { BadgeProps } from './types';

const Badge = ({ text, onBadgeClick }: BadgeProps) => {
	return (
		<div className='flex items-center justify-between gap-1 w-max py-0.5 px-2.5 bg-gray-300 rounded-xl'>
			<p>{text}</p>
			<img className='cursor-pointer' src={CloseIcon} width={16} height={16} onClick={onBadgeClick} />
		</div>
	);
};

export default Badge;
