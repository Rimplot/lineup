import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Divider,
	IconButton,
	Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { onSnapshot } from 'firebase/firestore';
import { Delete, Edit } from '@mui/icons-material';

import useLoggedInUser from '../hooks/useLoggedInUser';
import { signIn, signOut, signUp } from '../firebase/authService';
import {
	Concert,
	concertsCollection,
	createConcert,
	deleteConcert,
	editConcert
} from '../firebase/concertsService';
import ConcertFormDialog from '../components/ConcertFromDialog';

const Admin = () => {
	const user = useLoggedInUser();

	const [concerts, setConcerts] = useState<Concert[]>([]);

	useEffect(
		() =>
			onSnapshot(concertsCollection, snapshot =>
				setConcerts(snapshot.docs.map(doc => doc.data()))
			),
		[]
	);

	return (
		<>
			<Typography>Admin page</Typography>
			{user ? (
				<>
					<Typography>Hello {user.email}</Typography>
					<Button onClick={signOut}>Test sign out</Button>
					<ConcertFormDialog onSubmit={createConcert}>
						{open => (
							<Button onClick={open} variant="contained">
								Add Concert
							</Button>
						)}
					</ConcertFormDialog>
					{!!concerts.length && (
						<Box
							sx={{
								display: 'flex',
								gap: 2,
								flexDirection: 'row',
								flexWrap: 'wrap',
								width: '100%'
							}}
						>
							{concerts.map(c => (
								<Card key={c.date.seconds}>
									<CardContent>
										<Typography fontWeight="bold">{c.artist.name}</Typography>
										<Box
											component="img"
											sx={{
												height: 233,
												width: 350,
												maxHeight: { xs: 233, md: 167 },
												maxWidth: { xs: 350, md: 250 }
											}}
											src={c.artist.imageUrl}
										/>

										<Typography fontWeight="bold">{c.stage}</Typography>
										<Typography fontWeight="bold">
											{c.date.toDate().toLocaleString()}
										</Typography>
										<Divider sx={{ my: 1 }} />
									</CardContent>
									<CardActions sx={{ justifyContent: 'space-between' }}>
										<ConcertFormDialog onSubmit={editConcert} concert={c}>
											{open => (
												<IconButton onClick={open} color="info" title="Edit">
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
				</>
			) : (
				<>
					<Button onClick={() => signUp('admin@admin.com', 'adminadmin')}>
						Test Sign up
					</Button>
					<Button onClick={() => signIn('admin@admin.com', 'adminadmin')}>
						Test Login
					</Button>
				</>
			)}
		</>
	);
};

export default Admin;
