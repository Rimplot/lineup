import {
	Box,
	Button,
	Divider,
	Drawer,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography
} from '@mui/material';
import { Artist, Concert } from '../firebase/concertsService';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Timestamp } from 'firebase/firestore';
import useFavorites from '../hooks/useFavorites';
import { StageDetails } from '../model/Stages';

type GridItemProps = {
	concert: Concert;
};

const GridItem = ({ concert }: GridItemProps) => {
	const [detailsOpen, setDetailsOpen] = useState(false);

	const { isFavorite, addFavorite, removeFavorite } = useFavorites();
	const favorite = isFavorite(concert.id!);

	const toggleDrawer =
		(open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
			if (
				event.type === 'keydown' &&
				((event as React.KeyboardEvent).key === 'Tab' ||
					(event as React.KeyboardEvent).key === 'Shift')
			) {
				return;
			}

			setDetailsOpen(open);
		};

	return (
		<Grid item className="performers-grid-item" xs={12} sm={6} md={4} lg={3}>
			<Box
				position="relative"
				sx={{
					'backgroundImage': `url(${concert.artist.imageUrl})`,
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
						<Typography>{concert.artist.name}</Typography>
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
								{StageDetails[concert.stage].name} |{' '}
								{concert.date.toDate().toLocaleString()}
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
						<Drawer
							anchor="right"
							open={detailsOpen}
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
								{/* <List>
									{['Inbox', 'Starred', 'Send email', 'Drafts'].map(
										(text, index) => (
											<ListItem key={text} disablePadding>
												<ListItemButton>
													<ListItemIcon>
														{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
													</ListItemIcon>
													<ListItemText primary={text} />
												</ListItemButton>
											</ListItem>
										)
									)}
								</List>
								<Divider />
								<List>
									{['All mail', 'Trash', 'Spam'].map((text, index) => (
										<ListItem key={text} disablePadding>
											<ListItemButton>
												<ListItemIcon>
													{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
												</ListItemIcon>
												<ListItemText primary={text} />
											</ListItemButton>
										</ListItem>
									))}
								</List> */}
								<Box
									sx={{
										backgroundImage: `url(${concert.artist.imageUrl})`,
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
									<Typography
										variant="body1"
										style={{ whiteSpace: 'pre-line' }}
									>
										{concert.artist.fullDescription}
									</Typography>
								</Box>
							</Box>
						</Drawer>
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
