import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { useRef, useState, useEffect } from 'react';
import { Timestamp, onSnapshot } from 'firebase/firestore';

import Countdown from '../components/Countdown';
import PerformersGrid from '../components/PerformersGrid';
import jumbotron_bg from '../assets/home_jumbotron_bg.jpg';
import useFavorites from '../hooks/useFavorites';
import ConcertsTable from '../components/ConcertsTable';
import {
	Concert,
	concertsCollection,
	deadlineDocument
} from '../firebase/concertsService';

const Home = () => {
	const ref = useRef<any>(null);

	const handleClick = () => {
		ref.current?.scrollIntoView({ behavior: 'smooth' });
	};

	const [concerts, setConcerts] = useState<Concert[]>([]);
	const [deadline, setDeadline] = useState<Date>(new Date());

	useEffect(() => {
		onSnapshot(concertsCollection, snapshot =>
			setConcerts(snapshot.docs.map(doc => doc.data()))
		);
		onSnapshot(deadlineDocument(), snapshot =>
			setDeadline(snapshot.data()?.timestamp.toDate() ?? new Date())
		);
	}, []);

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
				<Stack
					direction={{ xs: 'column', md: 'row' }}
					spacing={2}
					sx={{ alignItems: 'center', justifyContent: 'center', my: 4 }}
				>
					<Countdown deadline={deadline} />
					<Typography
						variant="h3"
						style={{
							fontWeight: 'bold',
							paddingBottom: '0.4em'
						}}
					>
						until the start
					</Typography>
				</Stack>
				<Box my={4} display="flex" />
				<Box ref={ref}>
					<Typography variant="h2" my={4}>
						Headliners
					</Typography>
					<PerformersGrid concerts={concerts.filter(c => c.headliner)} />
				</Box>
				<Box my={4} display="flex" />
				<Box>
					<ConcertsTable concerts={concerts} />
				</Box>
			</Container>
		</>
	);
};

export default Home;
