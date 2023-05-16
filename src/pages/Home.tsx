import { Box, Button, Container, Grid, Typography } from '@mui/material';
import Countdown from '../components/Countdown';
import PerformersGrid from '../components/PerformersGrid';
import { useRef } from 'react';
import jumbotron_bg from '../assets/home_jumbotron_bg.jpg';

const Home = () => {
	const ref = useRef<any>(null);

	const handleClick = () => {
		ref.current?.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<>
			<Box
				sx={{
					background: `url(${jumbotron_bg}), rgba(0, 0, 0, 0.5)`,
					backgroundBlendMode: 'multiply',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					height: 500
				}}
			>
				<Box
					display="flex"
					height="100%"
					flexDirection="column"
					justifyContent="center"
					alignItems="center"
					sx={{ color: 'white' }}
				>
					<Typography variant="h1" style={{ fontWeight: 'bold' }}>
						LineUp
					</Typography>
					<Typography variant="h5">
						The best place to plan your festival season.
					</Typography>
					<Button
						variant="contained"
						color="secondary"
						size="large"
						sx={{ marginTop: 8 }}
						onClick={handleClick}
					>
						Take a look at the lineup
					</Button>
				</Box>
			</Box>
			<Container>
				<Box display="flex" justifyContent="center" my={4}>
					<Countdown deadline={new Date(+new Date() + 123456789)} />
				</Box>
				<Box ref={ref}>
					<PerformersGrid />
				</Box>
			</Container>
		</>
	);
};

export default Home;
