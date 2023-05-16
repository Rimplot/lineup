// Based on the solution of davi1985
// https://github.com/davi1985/countdown

import { useEffect, useState } from 'react';

import CountdownItem from './CountdownItem';

const calculateTimeLeft = (deadline: Date) => {
	const difference = +deadline - +new Date();

	if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

	return {
		days: Math.floor(difference / (1000 * 60 * 60 * 24)),
		hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
		minutes: Math.floor((difference / 1000 / 60) % 60),
		seconds: Math.floor((difference / 1000) % 60)
	};
};

type CountdownProps = {
	deadline: Date;
};

const Countdown = ({ deadline }: CountdownProps) => {
	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(deadline));

	useEffect(() => {
		setTimeout(() => setTimeLeft(calculateTimeLeft(deadline)), 1000);
	}, [timeLeft]);

	return (
		<div className="counter">
			<CountdownItem label="Days" value={timeLeft.days} />
			<CountdownItem label="Hours" value={timeLeft.hours} />
			<CountdownItem label="Minutes" value={timeLeft.minutes} />
			<CountdownItem label="Seconds" value={timeLeft.seconds} />
		</div>
	);
};

export default Countdown;
