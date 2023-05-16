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
import { Timestamp } from 'firebase/firestore';

type GridItemProps = {
	concert: Concert;
};

const GridItem = ({ concert }: GridItemProps) => {
	const [detailsOpen, setDetailsOpen] = useState(false);

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
						<Drawer
							anchor="right"
							open={detailsOpen}
							onClose={toggleDrawer(false)}
							PaperProps={{
								sx: { width: '90%', maxWidth: '800px' }
							}}
						>
							<Box
								position="relative"
								role="presentation"
								onClick={toggleDrawer(false)}
								onKeyDown={toggleDrawer(false)}
							>
								<Box position="absolute" top={16} left={16}>
									<IconButton
										aria-label="delete"
										onClick={toggleDrawer(false)}
										sx={{ backgroundColor: '#ffffff' }}
									>
										<CloseIcon />
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

const concert = {
	stage: 'Coca Cola Stage',
	date: new Timestamp(new Date('2023-05-29 20:00').getTime() / 1000, 0),
	artist: {
		name: 'The Doors',
		imageUrl:
			'https://upload.wikimedia.org/wikipedia/commons/6/69/The_Doors_1968.JPG',
		shortDescription:
			"The Doors were an American rock band formed in Los Angeles in 1965, with vocalist Jim Morrison, keyboardist Ray Manzarek, guitarist Robby Krieger, and drummer John Densmore. They were among the most influential and controversial rock acts of the 1960s, partly due to Morrison's lyrics and voice.",
		fullDescription:
			"The Doors were an American rock band formed in Los Angeles in 1965, with vocalist Jim Morrison, keyboardist Ray Manzarek, guitarist Robby Krieger, and drummer John Densmore. They were among the most influential and controversial rock acts of the 1960s, partly due to Morrison's lyrics and voice, along with his erratic stage persona. The group is widely regarded as an important figure of the era's counterculture.\nThe band took its name from the title of Aldous Huxley's book The Doors of Perception, itself a reference to a quote by William Blake. After signing with Elektra Records in 1966, the Doors with Morrison recorded and released six studio albums in five years, some of which are generally considered among the greatest of all time, including their self-titled debut (1967), Strange Days (1967), and L.A. Woman (1971). Dubbed the \"Kings of Acid Rock\", they were one of the most successful bands during that time and by 1972 the Doors had sold over 4 million albums domestically and nearly 8 million singles.\nMorrison died in uncertain circumstances in 1971. The band continued as a trio until disbanding in 1973. They released three more albums in the 1970s, one of which featured earlier recordings by Morrison, and over the decades reunited on stage in various configurations. In 2002, Manzarek, Krieger, and Ian Astbury of the Cult on vocals started performing as \"The Doors of the 21st Century\". Densmore and the Morrison estate successfully sued them over the use of the band's name. After a short time as Riders on the Storm, they settled on the name Manzarek–Krieger and toured until Manzarek's death in 2013."
	}
} as Concert;

const PerformersGrid = () => (
	<Grid container spacing={0}>
		<GridItem concert={concert} />
		<GridItem concert={concert} />
		<GridItem concert={concert} />
		<GridItem concert={concert} />
		<GridItem concert={concert} />
		<GridItem concert={concert} />
	</Grid>
);

export default PerformersGrid;
