import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Container,
	Divider,
	IconButton,
	Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { onSnapshot } from 'firebase/firestore';
import { Delete, Edit } from '@mui/icons-material';

import useLoggedInUser from '../hooks/useLoggedInUser';
import { signOut } from '../firebase/authService';
import {
	Concert,
	concertsCollection,
	createConcert,
	deadlineDocument,
	deleteConcert,
	editConcert
} from '../firebase/concertsService';
import ConcertFormDialog from '../components/ConcertFormDialog';
import DeadlineDialog from '../components/DeadlineDialog';
import Footer from '../components/Footer';
import AdminLogin from '../components/AdminLogin';
import { StageDetails } from '../model/Stages';

const Admin = () => {
	const user = useLoggedInUser();

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
			<Container
				sx={{ display: 'flex', flexDirection: 'column', minHeight: '80vh' }}
			>
				<Typography
					sx={{
						alignSelf: 'center',
						fontSize: '3rem',
						fontWeight: 'bold',
						paddingBottom: '1.5rem'
					}}
				>
					Admin Panel
				</Typography>
				{user ? (
					<>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								paddingLeft: '6rem',
								paddingRight: '6rem'
							}}
						>
							<Box sx={{ display: 'flex' }}>
								<Typography sx={{ fontSize: '1.5rem' }}>
									Current user:{' '}
								</Typography>
								<Box sx={{ width: '10px' }} />
								<Typography sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
									{user.email}
								</Typography>
							</Box>

							<Button variant="contained" onClick={signOut}>
								Sign out
							</Button>
						</Box>
						<Divider sx={{ marginTop: '1.5rem', marginBottom: '1rem' }} />
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								paddingLeft: '6rem',
								paddingRight: '6rem'
							}}
						>
							<Box sx={{ display: 'flex' }}>
								<Typography sx={{ fontSize: '1.5rem' }}>
									Current deadline:
								</Typography>
								<Box sx={{ width: '10px' }} />
								<Typography sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
									{deadline.toLocaleString()}
								</Typography>
							</Box>
							<DeadlineDialog initialDate={deadline}>
								{open => (
									<Button onClick={open} variant="outlined">
										Set new deadline
									</Button>
								)}
							</DeadlineDialog>
						</Box>
						<Divider sx={{ marginTop: '1.5rem', marginBottom: '1rem' }} />
						<Box sx={{ display: 'flex', flexDirection: 'column' }}>
							<Box sx={{ alignSelf: 'flex-end', paddingRight: '6rem' }}>
								<ConcertFormDialog onSubmit={createConcert}>
									{open => (
										<Button onClick={open} variant="contained">
											Add Concert
										</Button>
									)}
								</ConcertFormDialog>
							</Box>
							<Typography
								sx={{
									fontSize: '1.5rem',
									fontWeight: 'bold',
									paddingBottom: '1rem',
									paddingLeft: '6rem',
									paddingRight: '6rem'
								}}
							>
								Concerts list:
							</Typography>
							{!!concerts.length && (
								<Box
									sx={{
										display: 'flex',
										rowGap: 2,
										columnGap: 2,
										flexDirection: 'row',
										flexWrap: 'wrap',
										width: '100%',
										justifyContent: 'space-between',
										px: '1em',
										paddingBottom: '4rem'
									}}
								>
									{concerts.map(c => (
										<Card key={c.date.seconds} sx={{ minWidth: '25%' }}>
											<CardContent>
												<Typography variant="h5">{c.artist.name}</Typography>
												<Box
													sx={{
														width: '100%',
														aspectRatio: '3 / 2',
														maxHeight: { xs: 233, md: 167 },
														maxWidth: { xs: 350, md: 250 },
														backgroundImage: `url(${c.artist.images[0]})`,
														backgroundSize: 'cover',
														backgroundPosition: 'center'
													}}
												/>

												<Typography variant="overline">
													{StageDetails[c.stage].name}
												</Typography>
												<Typography variant="body1">
													{c.date.toDate().toLocaleString()}
												</Typography>
												<Divider sx={{ my: 1 }} />
											</CardContent>
											<CardActions sx={{ justifyContent: 'space-between' }}>
												<ConcertFormDialog onSubmit={editConcert} concert={c}>
													{open => (
														<IconButton
															onClick={open}
															color="info"
															title="Edit"
														>
															<Edit />
														</IconButton>
													)}
												</ConcertFormDialog>
												<IconButton
													onClick={() => deleteConcert(c.id!)}
													color="error"
													title="Delete"
												>
													<Delete />
												</IconButton>
											</CardActions>
										</Card>
									))}
								</Box>
							)}
						</Box>
					</>
				) : (
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center'
						}}
					>
						<AdminLogin />
					</Box>
				)}
			</Container>
			<Footer />
		</>
	);
};

export default Admin;
