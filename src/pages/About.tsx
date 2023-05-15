import { Typography } from '@mui/material';

import { useTranslation } from '../hooks/useTranslation';
import usePageTitle from '../hooks/usePageTitle';

const About = () => {
	const t = useTranslation();
	usePageTitle(t('about'));
	return (
		<Typography>
			Dimitri Vegas & Like Mike’s path from celebrated DJs to dominating the
			global electronic music scene has been on a constant, upward trajectory
			leading them to once again become the World toppling No.1 DJs. Having won
			the 2019 edition DJ Mag’s Top 100 DJs poll the pioneering duo return to
			the top spot following their debut back in 2015, that saw them become the
			first-ever duo to win the No.1 DJ’s crown. Their unique live shows have
			propelled them into global stars and enabled them to become two of the
			most prominent dance music figures of the modern era. The anointed ‘King
			of Tomorrowland’ set the world stage on fire with countless headline
			performances for festivals such as EDC Las Vegas, EXIT festival,
			Parookaville, UNTOLD, Sensation and Creamfields. As well as led to the duo
			becoming a fixture on stages normally reserved for pop and rock stars, of
			which have included the UEFA Champions League Final in Madrid and
			Lollapalooza South America
		</Typography>
	);
};

export default About;
