import { Box, Drawer, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { Concert } from '../firebase/concertsService';
import useFavorites from '../hooks/useFavorites';

type ConcertDrawerProps = {
	concert: Concert;
	open: boolean;
	toggleDrawer: (
		open: boolean
	) => (event: React.KeyboardEvent | React.MouseEvent) => void;
};

const ConcertDrawer = ({ concert, open, toggleDrawer }: ConcertDrawerProps) => {
	const { isFavorite, addFavorite, removeFavorite } = useFavorites();
	const favorite = isFavorite(concert.id!);

	return (
		<Drawer
			anchor="right"
			open={open}
			onClose={toggleDrawer(false)}
			PaperProps={{
				sx: { width: '90%', maxWidth: '800px' }
			}}
		>
			<Box position="relative" role="presentation">
				<Box position="absolute" top={16} left={16}>
					<IconButton aria-label="close" onClick={toggleDrawer(false)}>
						<CloseIcon />
					</IconButton>
				</Box>
				<Box position="absolute" top={16} right={16}>
					<IconButton
						aria-label="favorite"
						onClick={() =>
							favorite
								? removeFavorite(concert.id ?? '')
								: addFavorite(concert.id ?? '')
						}
						sx={{
							color: favorite ? 'red' : 'inherit'
						}}
					>
						<FavoriteIcon />
					</IconButton>
				</Box>
				<Box
					sx={{
						backgroundImage: `url(${concert.artist.images[0]})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						width: '100%',
						aspectRatio: '3 / 2'
					}}
				/>
				<Box p={4}>
					<Typography variant="h3">{concert.artist.name}</Typography>
					<Typography variant="overline">
						{concert.stage} | {concert.date.toDate().toLocaleString()}
					</Typography>
					<Typography variant="body1" style={{ whiteSpace: 'pre-line' }}>
						{concert.artist.fullDescription}
					</Typography>
				</Box>
			</Box>
		</Drawer>
	);
};

export default ConcertDrawer;
