import { Box, Button, Grid, Typography } from '@mui/material';
import { Artist } from '../firebase/concertsService';

type GridItemProps = {
	artist: Artist;
};

const GridItem = ({ artist }: GridItemProps) => (
	<Grid item className="performers-grid-item" xs={12} sm={6} md={4} lg={3}>
		<Box
			position="relative"
			sx={{
				'backgroundImage': `url(${artist.imageUrl})`,
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
						backgroundColor: '#f5f855',
						textTransform: 'uppercase',
						fontWeight: 'bold'
					}}
				>
					<Typography>{artist.name}</Typography>
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
						color: 'white'
					}}
				>
					<Box sx={{ textTransform: 'uppercase' }}>
						<Typography variant="h5">{artist.name}</Typography>
					</Box>
					<Typography variant="body2">{artist.shortDescription}</Typography>
					<Button
						variant="outlined"
						sx={{ position: 'absolute', bottom: 16, right: 16 }}
					>
						Read more
					</Button>
				</Box>
			</Box>
		</Box>
	</Grid>
);

const artist = {
	name: 'The Doors',
	imageUrl:
		'https://upload.wikimedia.org/wikipedia/commons/6/69/The_Doors_1968.JPG',
	shortDescription:
		"The Doors were an American rock band formed in Los Angeles in 1965, with vocalist Jim Morrison, keyboardist Ray Manzarek, guitarist Robby Krieger, and drummer John Densmore. They were among the most influential and controversial rock acts of the 1960s, partly due to Morrison's lyrics and voice."
} as Artist;

const PerformersGrid = () => (
	<Grid container spacing={0}>
		<GridItem artist={artist} />
		<GridItem artist={artist} />
		<GridItem artist={artist} />
		<GridItem artist={artist} />
		<GridItem artist={artist} />
		<GridItem artist={artist} />
	</Grid>
);

export default PerformersGrid;
