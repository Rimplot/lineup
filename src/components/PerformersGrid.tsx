import { Box, Button, Grid, Typography } from '@mui/material';

import { Concert } from '../firebase/concertsService';
import useDrawer from '../hooks/useDrawer';
import { GenreDetails } from '../model/Genres';

import ConcertDrawer from './ConcertDrawer';

type GridItemProps = {
	concert: Concert;
};

const GridItem = ({ concert }: GridItemProps) => {
	const { detailsOpen, toggleDrawer } = useDrawer();

	return (
		<Grid item className="performers-grid-item" xs={12} sm={6} md={4} lg={3}>
			<Box
				position="relative"
				sx={{
					'backgroundImage': `url(${concert.artist.images[0]})`,
					'backgroundSize': 'cover',
					'backgroundPosition': 'center',
					'&::after': {
						content: '""',
						display: 'block',
						paddingBottom: '100%'
					},
					'&:hover .performer-overlay': {
						opacity: 1
					}
				}}
			>
				<Box position="absolute" width="100%" height="100%">
					<Box
						position="absolute"
						bottom={0}
						p={2}
						sx={{
							color: 'white',
							backgroundColor: GenreDetails[concert.artist.genre].color,
							textTransform: 'uppercase'
						}}
					>
						<Typography sx={{ fontWeight: 'bold' }}>
							{concert.artist.name}
						</Typography>
					</Box>
					<Box
						className="performer-overlay"
						position="absolute"
						width="100%"
						height="100%"
						top="50%"
						left="50%"
						p={2}
						sx={{
							transition: '.5s ease',
							transform: 'translate(-50%, -50%)',
							backgroundColor: 'rgba(0, 0, 0, 0.9)',
							opacity: 0,
							color: 'white',
							userSelect: 'none'
						}}
					>
						<Box sx={{ textTransform: 'uppercase' }}>
							<Typography variant="h5">{concert.artist.name}</Typography>
							<Typography variant="overline">
								{concert.stage} | {concert.date.toDate().toLocaleString()}
							</Typography>
						</Box>
						<Typography variant="body2">
							{concert.artist.shortDescription}
						</Typography>
						<Button
							variant="outlined"
							sx={{ position: 'absolute', bottom: 16, right: 16 }}
							onClick={toggleDrawer(true)}
						>
							Read more
						</Button>
						<ConcertDrawer
							concert={concert}
							open={detailsOpen}
							toggleDrawer={toggleDrawer}
						/>
					</Box>
				</Box>
			</Box>
		</Grid>
	);
};

type PerformersGridProps = {
	concerts: Array<Concert>;
};

const PerformersGrid = ({ concerts }: PerformersGridProps) => (
	<Grid container spacing={0}>
		{concerts.map((concert, index) => (
			<GridItem concert={concert} key={index} />
		))}
	</Grid>
);

export default PerformersGrid;
